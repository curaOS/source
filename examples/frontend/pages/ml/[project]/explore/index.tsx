// @ts-nocheck
/** @jsxImportSource theme-ui */

import { useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { useRouter } from 'next/router'
import { utils } from 'near-api-js'
import { Button, Box, Link, Spinner } from 'theme-ui'

import { useNFTMethod, useNFTContract } from '@cura/hooks'
import { MediaObject } from '@cura/components'

import Layout from '../../../../containers/Layout'
import { getFrameWidth } from 'utils/frame-width'
import { mapPathToProject } from 'utils/path-to-project'
import { alertMessageState } from '../../../../state/recoil'

const CONTRACT_RANDOM_GAS = utils.format.parseNearAmount('0.00000000020') // 200 Tgas

const NFT_PER_PAGE = 4

const Explore = () => {
    const router = useRouter()
    const setAlertMessage = useSetRecoilState(alertMessageState)

    const contractAdress = router && mapPathToProject(router.asPath)
    const project = `ml/${router.query.project}`

    // get total supply, which we need to detect if all NFTs are loaded
    const { data: totalSupply } = useNFTMethod(
        `${contractAdress}`,
        'nft_total_supply',
        {}
    )

    // hook that contains all the logic of explore page
    const { items, loading, nextPage } = useNFTExplore(
        contractAdress,
        NFT_PER_PAGE
    )

    // load next page
    function loadMore() {
        // if all NFTs are loaded or we are already loading more then do nothing
        if (totalSupply <= items.length || loading) {
            return
        }
        try {
            nextPage()
        } catch (error) {
            console.error(error)
            setAlertMessage(error.toString())
        }
    }

    // If user scroll to bottom, show next page
    const handleScroll = () => {
        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight ||
            window.innerHeight + window.pageYOffset >=
                document.body.scrollHeight - 10
        ) {
            loadMore()
        }
    }

    // Watch for user scroll
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll)
        }
        return () => window.removeEventListener('scroll', handleScroll)
    })
    const designDimension = getFrameWidth(true)

    return (
        <Layout project={project}>
            <Box sx={{ textAlign: 'center' }}>
                {items &&
                    items.map((item, index) => {
                        return (
                            <Link
                                key={index}
                                href={`/${project}/explore/${item.id}`}
                                m={[1, 2, 3]}
                                sx={{
                                    display: 'inline-flex',
                                    position: 'relative',
                                    ':hover': {
                                        opacity: '0.8',
                                    },
                                }}
                            >
                                <div
                                    sx={{
                                        position: 'absolute',
                                        height: '100%',
                                        width: '100%',
                                        zIndex: 1,
                                    }}
                                ></div>
                                <MediaObject
                                    mediaURI={`https://arweave.net/${item.metadata.media}`}
                                    width={designDimension}
                                    height={designDimension}
                                />
                            </Link>
                        )
                    })}
            </Box>
            <Box
                mt={4}
                mb={2}
                sx={{
                    textAlign: 'center',
                }}
            >
                {totalSupply <= items.length ? undefined : loading ? (
                    <Spinner />
                ) : (
                    <Button
                        onClick={() => {
                            loadMore()
                        }}
                        variant="primary"
                        m="auto"
                        sx={{
                            cursor: 'pointer',
                        }}
                    >
                        Load more
                    </Button>
                )}
            </Box>
        </Layout>
    )
}

export default Explore

function useNFTExplore(contractAdress: string, limitPerPage = 4) {
    const [currentPage, setCurrentPage] = useState(0)
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const from_index = Math.floor(limitPerPage * currentPage)

    const { contract } = useNFTContract(contractAdress)

    async function getData() {
        const newData = await contract.nft_tokens(
            {
                from_index: from_index ? from_index.toString() : '0', // prevent toString() from converting 0 to NaN
                limit: limitPerPage,
            },
            CONTRACT_RANDOM_GAS
        )
        setData([...data, ...newData])
        setIsLoading(false)
    }

    // Excute function if contract change or currentPage change
    useEffect(() => {
        // make sure the user is logged in and the contract is the right contract
        if (
            contract?.account?.accountId &&
            contract.contractId == contractAdress
        ) {
            setIsLoading(true)
            getData()
        }
    }, [contract, currentPage])

    return {
        items: data,
        loading: isLoading,
        nextPage: () => setCurrentPage(currentPage + 1),
    }
}
