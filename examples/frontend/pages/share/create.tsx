// @ts-nocheck
/** @jsxImportSource theme-ui */

import { useState, createRef } from 'react'
import { utils } from 'near-api-js'
import CreateLayout from '../../containers/layouts/Create'
import { CreatorShare } from '@cura/components'
import { alertMessageState, indexLoaderState } from '../../state/recoil'
import { useSetRecoilState } from 'recoil'
import { useNFTContract } from '@cura/hooks'
import { combineHTML } from '../../utils/combine-html'
import axios from 'axios'
import { useRouter } from 'next/router'
import { mapPathToProject } from 'utils/path-to-project'
import { htmlToImg } from 'utils/html-to-img'

const CONTRACT_DESIGN_GAS = utils.format.parseNearAmount('0.00000000020') // 200 Tgas
const CONTRACT_CLAIM_GAS = utils.format.parseNearAmount('0.00000000029') // 300 Tgas
const CONTRACT_CLAIM_PRICE = utils.format.parseNearAmount('1') // 1N

const HARDCODED_ROYALTY_ADDRESS = process.env.YSN_ADDRESS
const HARDCODED_ROYALTY_SHARE = '2500'

const arweaveLambda = process.env.NEXT_PUBLIC_ARWEAVE_LAMBDA

const SCHEMA_SIZE = 5

const Create = () => {
    const router = useRouter()
    const contractAdress = router && mapPathToProject(router.asPath)
    const project = `share`

    const { contract } = useNFTContract(contractAdress)

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

    const iframeRef = createRef(null)
    const generatePreview = async () => {
        const iframeHtml = iframeRef.current.contentWindow.document.body
        return await htmlToImg(iframeHtml)
    }

    async function claimDesign() {
        const preview = await generatePreview()

        setIndexLoader(true)

        try {
            const liveResponse = axios.post(
                arweaveLambda,
                JSON.stringify({
                    contentType: 'text/html',
                    data: creativeCode,
                })
            )

            const previewResponse = axios.post(
                arweaveLambda,
                JSON.stringify({
                    contentType: 'image/jpeg',
                    data: preview,
                })
            )

            console.log('live ', liveResponse.data.transaction.id)
            console.log('preview ', previewResponse.data.transaction.id)

            await contract.claim_media(
                {
                    tokenMetadata: {
                        media: previewResponse.data.transaction.id,
                        media_animation: liveResponse.data.transaction.id,
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
        } catch (error) {
            console.error(error)
            setIndexLoader(false)
            setAlertMessage(error.toString())
        }
    }

    return (
        <CreateLayout
            project={project}
            frameComponent={
                <>
                    {creativeCode && (
                        <iframe
                            ref={iframeRef}
                            srcDoc={creativeCode}
                            width={'100%'}
                            height={'100%'}
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
            claimDesign={creativeCode == '' ? () => void 0 : claimDesign}
        />
    )
}

export default Create
