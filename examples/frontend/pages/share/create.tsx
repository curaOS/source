// @ts-nocheck
/** @jsxImportSource theme-ui */

import { useState } from 'react'
import { Button, Text } from 'theme-ui'
import { utils } from 'near-api-js'
import Layout from '../../components/Layout'
import { CreatorShare, RenderIframe } from '@cura/components'
import { alertMessageState, indexLoaderState } from '../../state/recoil'
import { useSetRecoilState } from 'recoil'
import useNFTContract from 'hooks/useNFTContract'
import { combineHTML } from '../../utils/combine-html'
import axios from 'axios'
import { getFrameWidth } from 'utils/frame-width'

const CONTRACT_DESIGN_GAS = utils.format.parseNearAmount('0.00000000020') // 200 Tgas
const CONTRACT_CLAIM_GAS = utils.format.parseNearAmount('0.00000000029') // 300 Tgas
const CONTRACT_CLAIM_PRICE = utils.format.parseNearAmount('1') // 1N

const HARDCODED_ROYALTY_ADDRESS = process.env.YSN_ADDRESS
const HARDCODED_ROYALTY_SHARE = '2500'

const arweaveLambda = process.env.NEXT_PUBLIC_ARWEAVE_LAMBDA

const SCHEMA_SIZE = 5

const Create = ({}) => {
    const { contract } = useNFTContract()

    const [seed, setSeed] = useState()

    const setAlertMessage = useSetRecoilState(alertMessageState)
    const setIndexLoader = useSetRecoilState(indexLoaderState)

    const [creativeCode, setCreativeCode] = useState('')

    async function retrieveData() {
        setIndexLoader(true)

        try {
            const result = await contract.generate({}, CONTRACT_DESIGN_GAS)

            const nftMetadata = await contract.nft_metadata()

            setSeed(result?.seed)

            const arweaveHTML = combineHTML(
                `<script>let jsonParams = '${JSON.stringify({
                    instructions: result?.instructions?.split(','),
                })}'</script>`,
                nftMetadata.packages_script,
                nftMetadata.render_script,
                nftMetadata.style_css
            )

            setCreativeCode(arweaveHTML)

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
                JSON.stringify({ contentType: 'text/html', data: creativeCode })
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
        <Layout>
            <div
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
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

export default Create
