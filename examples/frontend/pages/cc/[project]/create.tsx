// @ts-nocheck
/** @jsxImportSource theme-ui */

import { utils } from 'near-api-js'
import { useRouter } from 'next/router'
import CreateLayout from '../../../containers/layouts/Create'

import { CreatorShare } from '@cura/components'
import { alertMessageState, indexLoaderState } from '../../../state/recoil'
import { useSetRecoilState } from 'recoil'
import { useNFTContract } from '@cura/hooks'
import { useState } from 'react'
import axios from 'axios'
import { combineHTML } from 'utils/combine-html'
import { mapPathToProject } from 'utils/path-to-project'

const CONTRACT_CLAIM_GAS = utils.format.parseNearAmount(`0.00000000029`) // 300 Tgas
const CONTRACT_CLAIM_PRICE = utils.format.parseNearAmount(`1`) // 1N

const HARDCODED_ROYALTY_ADDRESS = process.env.YSN_ADDRESS
const HARDCODED_ROYALTY_SHARE = `2500`

const arweaveLambda = process.env.NEXT_PUBLIC_ARWEAVE_LAMBDA

const MLProjectCreate = () => {
    const router = useRouter()
    const project = `cc/${router.query.project}`
    const { contract } = useNFTContract(`${mapPathToProject(router.asPath)}`)
    const [seed, setSeed] = useState()

    const setAlertMessage = useSetRecoilState(alertMessageState)
    const setIndexLoader = useSetRecoilState(indexLoaderState)

    const [creativeCode, setCreativeCode] = useState(``)

    async function retrieveData() {
        setIndexLoader(true)

        try {
            const newSeed = [...Array(64)]
                .map(() => Math.floor(Math.random() * 16).toString(16))
                .join(``)

            setSeed(newSeed)

            const nftMetadata = await contract.nft_metadata()

            const arweaveHTML = combineHTML(
                `<script>
            let tokenData = {
                "hash": "${newSeed}"
                }</script>`,
                nftMetadata.packages_script,
                nftMetadata.render_script,
                nftMetadata.style_css
            )

            setCreativeCode(arweaveHTML)

            setTimeout(() => setIndexLoader(false), 200)
        } catch (e) {
            setIndexLoader(false)
            console.log(e)
            setAlertMessage(e.toString())
        }
    }

    async function claimDesign() {
        setIndexLoader(true)

        axios
            .post(
                arweaveLambda,
                JSON.stringify({
                    contentType: `text/html`,
                    data: creativeCode,
                })
            )
            .then(async function (response) {
                await contract.claim_media(
                    {
                        tokenMetadata: {
                            media: response.data.transaction.id,
                            extra: Buffer.from(
                                JSON.stringify({
                                    seed: seed,
                                })
                            ).toString(`base64`),
                        },
                    },
                    CONTRACT_CLAIM_GAS,
                    CONTRACT_CLAIM_PRICE
                )
                router.push(`${project}`)
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
                <>
                    {creativeCode && (
                        <iframe
                            srcDoc={creativeCode}
                            width={`100%`}
                            height={`100%`}
                            frameBorder="0"
                            scrolling="no"
                        ></iframe>
                    )}
                </>
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
