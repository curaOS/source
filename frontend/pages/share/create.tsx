// @ts-nocheck
/** @jsxImportSource theme-ui */

import { useState } from 'react'
import { Button, Text } from 'theme-ui'
import { utils } from 'near-api-js'
import Layout from '../../components/Layout'
import CreatorShare from '../../components/CreatorShare'
import Picker from '../../components/Picker'
import Design from '../../components/Design'
import { alertMessageState, indexLoaderState } from '../../state/recoil'
import { useSetRecoilState } from 'recoil'
import useNFTContract from 'hooks/useNFTContract'
import { combineHTML } from '../../utils/combine-html'
import axios from 'axios'

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
    const [schema, setSchema] = useState(new Set())
    const [designInstructions, setDesignInstructions] = useState()

    const setAlertMessage = useSetRecoilState(alertMessageState)
    const setIndexLoader = useSetRecoilState(indexLoaderState)

    const pickEmoji = (code: number) => {
        if (schema.has(code)) {
            setSchema((oldSchema) => {
                const newSchema = new Set(oldSchema)
                newSchema.delete(code)
                return newSchema
            })
        } else if (schema.size < SCHEMA_SIZE) {
            setSchema((oldSchema) => {
                const newSchema = new Set(oldSchema)
                newSchema.add(code)
                return newSchema
            })
        } else {
            // schema complete
            return
        }
    }

    async function retrieveData() {
        setIndexLoader(true)

        try {
            const result = await contract.generate({}, CONTRACT_DESIGN_GAS)

            setDesignInstructions(result?.split(','))

            setTimeout(() => setIndexLoader(false), 200)
        } catch (e) {
            setIndexLoader(false)
            setAlertMessage(e.toString())
        }
    }

    async function claimDesign() {
        setIndexLoader(true)

        try {
            await contract.claim_media(
                { seed, schema: Array.from(schema) },
                CONTRACT_CLAIM_GAS,
                CONTRACT_CLAIM_PRICE
            )
        } catch (e) {
            setIndexLoader(false)
            setAlertMessage(e.toString())
        }
    }

    async function claimDesign() {
        setIndexLoader(true)

        const nftMetadata = await contract.nft_metadata()

        const arweaveHTML = combineHTML(
            `<script>let jsonParams = '${JSON.stringify({
                instructions: designInstructions,
            })}'</script>`,
            nftMetadata.packages_script,
            nftMetadata.render_script,
            nftMetadata.style_css
        )

        console.log(arweaveHTML)

        axios
            .post(arweaveLambda, arweaveHTML, {
                headers: {
                    'Content-Type': 'text/html',
                },
            })
            .then(async function (response) {
                console.log(response)

                await contract.claim_media(
                    {
                        tokenMetadata: {
                            media: response.data.transaction.id,
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
                        textAlign: 'center',
                        mb: 3,
                    }}
                >
                    {Array.from(schema).map((emojiCode) => {
                        return (
                            <Text mx="1">
                                {String.fromCodePoint(emojiCode)}
                            </Text>
                        )
                    })}
                </div>
                <div
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Design instructions={designInstructions} />
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
