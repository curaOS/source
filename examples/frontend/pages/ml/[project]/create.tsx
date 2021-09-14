// @ts-nocheck
/** @jsxImportSource theme-ui */

import { Button } from 'theme-ui'
import { utils } from 'near-api-js'
import { useRouter } from 'next/router'
import Layout from '../../../containers/Layout'
import { HostedModel } from '@runwayml/hosted-models'
import { CreatorShare } from '@cura/components'
import { alertMessageState, indexLoaderState } from '../../../state/recoil'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import useNFTContract from 'hooks/useNFTContract'
import { accountState } from 'state/account'
import { useState } from 'react'
import axios from 'axios'
import { getFrameWidth } from 'utils/frame-width'

const CONTRACT_VIEW_GAS = utils.format.parseNearAmount('0.00000000010') // 100 Tgas
const CONTRACT_CLAIM_GAS = utils.format.parseNearAmount('0.00000000029') // 300 Tgas
const CONTRACT_CLAIM_PRICE = utils.format.parseNearAmount('1') // 1N
const CONTRACT_BURN_GAS = utils.format.parseNearAmount('0.00000000029') // 290 Tgas
const MARKET_ACCEPT_BID_GAS = utils.format.parseNearAmount('0.00000000025') // 250 Tgas
const YOCTO_NEAR = utils.format.parseNearAmount('0.000000000000000000000001')

const HARDCODED_ROYALTY_ADDRESS = process.env.YSN_ADDRESS
const HARDCODED_ROYALTY_SHARE = '2500'

function rotate(srcBase64, degrees, callback) {
    const canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')
    let image = new Image()
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

const MLProjectCreate = ({}) => {
    const router = useRouter()
    const project = `ml/${router.query.project}`
    const { contract } = useNFTContract(
        `ml${router.query.project}.ysn-1_0_0.ysn.testnet`
    )

    console.log(contract)

    const setAlertMessage = useSetRecoilState(alertMessageState)
    const setIndexLoader = useSetRecoilState(indexLoaderState)

    const [media, setMedia] = useState('')

    const { accountId } = useRecoilValue(accountState)

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

            if (project == 'ml/1c') {
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
                    contentType: 'image/jpeg',
                    data: media,
                })
            )
            .then(async function (response) {
                await contract.claim_media(
                    {
                        media: response.data.transaction.id,
                    },
                    CONTRACT_CLAIM_GAS,
                    CONTRACT_CLAIM_PRICE
                )
            })
            .catch(function (error) {
                setIndexLoader(false)
                setAlertMessage(error.toString())
            })
    }

    const frameDimension = getFrameWidth()

    return (
        <Layout project={project}>
            <div
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
            >
                <div
                    sx={{
                        textAlign: 'center',
                        mb: 3,
                    }}
                >
                    <Button mx="2" mt="1" onClick={retrieveData} variant="uno">
                        Design
                    </Button>
                    <Button mx="2" mt="1" onClick={claimDesign} variant="due">
                        Claim
                    </Button>
                </div>
                <div
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <img src={media} width={frameDimension} />
                </div>
                <div
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 3,
                    }}
                >
                    <CreatorShare
                        address={HARDCODED_ROYALTY_ADDRESS}
                        share={HARDCODED_ROYALTY_SHARE}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default MLProjectCreate
