// @ts-nocheck
/** @jsxImportSource theme-ui */

import { Button } from 'theme-ui'
import { utils } from 'near-api-js'
import { useRouter } from 'next/router'
import Layout from '../../../containers/Layout'

import { CreatorShare, RenderIframe } from '@cura/components'
import { alertMessageState, indexLoaderState } from '../../../state/recoil'
import { useSetRecoilState } from 'recoil'
import useNFTContract from 'hooks/useNFTContract'
import { useState } from 'react'
import axios from 'axios'
import { combineHTML } from 'utils/combine-html'
import { mapPathToProject } from 'containers/near'
import { getFrameWidth } from 'utils/frame-width'

const CONTRACT_CLAIM_GAS = utils.format.parseNearAmount('0.00000000029') // 300 Tgas
const CONTRACT_CLAIM_PRICE = utils.format.parseNearAmount('1') // 1N

const HARDCODED_ROYALTY_ADDRESS = process.env.YSN_ADDRESS
const HARDCODED_ROYALTY_SHARE = '2500'

const arweaveLambda = process.env.NEXT_PUBLIC_ARWEAVE_LAMBDA

const MLProjectCreate = ({}) => {
    const router = useRouter()
    const project = `cc/${router.query.project}`
    const { contract } = useNFTContract(`${mapPathToProject(router.asPath)}`)
    const [seed, setSeed] = useState()

    const setAlertMessage = useSetRecoilState(alertMessageState)
    const setIndexLoader = useSetRecoilState(indexLoaderState)

    const [creativeCode, setCreativeCode] = useState('')

    async function retrieveData() {
        setIndexLoader(true)

        try {
            const newSeed = [...Array(64)]
                .map(() => Math.floor(Math.random() * 16).toString(16))
                .join('')

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
                    contentType: 'text/html',
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
                            ).toString('base64'),
                        },
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
                    {creativeCode && (
                        <RenderIframe
                            code={creativeCode}
                            width={frameDimension}
                        ></RenderIframe>
                    )}
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
