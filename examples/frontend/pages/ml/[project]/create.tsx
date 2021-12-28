// @ts-nocheck
/** @jsxImportSource theme-ui */

import { utils } from 'near-api-js'
import { useRouter } from 'next/router'
import CreateLayout from '../../../containers/layouts/Create'
import { HostedModel } from '@runwayml/hosted-models'
import { CreatorShare, MediaObject } from '@cura/components'
import { alertMessageState, indexLoaderState } from '../../../state/recoil'
import { useSetRecoilState } from 'recoil'
import { useNFTContract } from '@cura/hooks'
import { useState } from 'react'
import axios from 'axios'

const CONTRACT_CLAIM_GAS = utils.format.parseNearAmount(`0.00000000029`) // 300 Tgas
const CONTRACT_CLAIM_PRICE = utils.format.parseNearAmount(`1`) // 1N

const HARDCODED_ROYALTY_ADDRESS = process.env.YSN_ADDRESS
const HARDCODED_ROYALTY_SHARE = `2500`

function rotate(srcBase64, degrees, callback) {
    const canvas = document.createElement(`canvas`)
    const ctx = canvas.getContext(`2d`)
    const image = new Image()
    image.onload = function () {
        canvas.width = degrees % 180 === 0 ? image.width : image.height
        canvas.height = degrees % 180 === 0 ? image.height : image.width
        ctx.translate(canvas.width / 2, canvas.height / 2)
        ctx.rotate((degrees * Math.PI) / 180)
        ctx.drawImage(image, image.width / -2, image.height / -2)
        callback(canvas.toDataURL())
    }
    image.src = srcBase64
}

const getRandomValue = () => {
    const value = (Math.random() - 0.5) / 25
    console.log(value)
    return value
}

const modelProps = {
    '1c': {
        url: process.env.NEXT_PUBLIC_ML_1C,
    },
    '1w': {
        url: process.env.NEXT_PUBLIC_ML_1W,
    },
}

const arweaveLambda = process.env.NEXT_PUBLIC_ARWEAVE_LAMBDA

const MLProjectCreate = () => {
    const router = useRouter()
    const project = `ml/${router.query.project}`
    const { contract } = useNFTContract(
        `ml${router.query.project}.ysn-1_0_0.ysn.testnet`
    )

    console.log(project)

    const setAlertMessage = useSetRecoilState(alertMessageState)
    const setIndexLoader = useSetRecoilState(indexLoaderState)

    const [media, setMedia] = useState(``)

    const hostedModel = {
        ...modelProps[router.query.project],
    }

    let model

    // Your Hosted Model your must be in the format https://my-model.hosted-models.runwayml.cloud/v1.
    if (hostedModel?.url) {
        model = new HostedModel(hostedModel)
    }

    async function retrieveData() {
        setIndexLoader(true)

        try {
            const inputs = {
                z: Array.from({ length: 512 }, getRandomValue),
                truncation: 0.75,
            }

            const result = await model.query(inputs)
            console.log(inputs)

            if (project == `ml/1c`) {
                rotate(result.image, 90, (dataImage) => {
                    setMedia(dataImage)
                })
            } else {
                setMedia(result.image)
            }

            setTimeout(() => setIndexLoader(false), 200)
        } catch (e) {
            setIndexLoader(false)
            setAlertMessage(e.toString())
        }
    }

    async function claimDesign() {
        setIndexLoader(true)

        axios
            .post(
                arweaveLambda,
                JSON.stringify({
                    contentType: `image/jpeg`,
                    data: media,
                })
            )
            .then(async function (response) {
                await contract.claim_media(
                    {
                        media: response.data.transaction.id,
                    },
                    CONTRACT_CLAIM_GAS,
                    CONTRACT_CLAIM_PRICE,
                    `${window.location}/${project}`
                )
            })
            .catch(function (error) {
                setIndexLoader(false)
                setAlertMessage(error.toString())
            })
    }

    return (
        <CreateLayout
            project={project}
            frameComponent={
                <MediaObject mediaURI={media} type="image" width={`100%`} />
            }
            royaltiesComponent={
                <CreatorShare
                    address={HARDCODED_ROYALTY_ADDRESS}
                    share={HARDCODED_ROYALTY_SHARE}
                />
            }
            retrieveData={retrieveData}
            claimDesign={claimDesign}
        />
    )
}

export default MLProjectCreate
