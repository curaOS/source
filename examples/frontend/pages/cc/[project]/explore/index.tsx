// @ts-nocheck
/** @jsxImportSource theme-ui */

import { useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { useRouter } from 'next/router'
import { utils } from 'near-api-js'

import { useNFTMethod, useNFTContract } from '@cura/hooks'

import ExploreLayout from '../../../../containers/layouts/Explore'
import { mapPathToProject } from 'utils/path-to-project'
import { alertMessageState } from '../../../../state/recoil'

import { useQuery, gql } from '@apollo/client'

const CONTRACT_RANDOM_GAS = utils.format.parseNearAmount(`0.00000000020`) // 200 Tgas

const NFT_PER_PAGE = 4


const GET_NFTS = gql`
    query GetNfts {
        nfts {
            id
            title
            description
            media
        }
    }
`

const Explore = () => {
    const router = useRouter()
    const setAlertMessage = useSetRecoilState(alertMessageState)

    const contractAdress = router && mapPathToProject(router.asPath)
    const project = `cc/${router.query.project}`

    // get total supply, which we need to detect if all NFTs are loaded
    const { data: totalSupply } = useNFTMethod(
        contractAdress,
        `nft_total_supply`,
        {}
    )

    // hook that contains all the logic of explore page
    // const { items, nextPage } = useNFTExplore(
    //     contractAdress,
    //     NFT_PER_PAGE
    // )

    function loadMore() {
        try {
            nextPage()
        } catch (error) {
            console.error(error)
            setAlertMessage(error.toString())
        }
    }


    const { loading, error, data } = useQuery(GET_NFTS)

    console.log(data, error, loading)

    return (
        <ExploreLayout
            project={project}
            items={(data && data.nfts) || []}
            loadMore={loadMore}
            totalSupply={totalSupply}
            baseUrl={`/${project}/explore/`}
        />
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
                from_index: from_index ? from_index.toString() : `0`, // prevent toString() from converting 0 to NaN
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contract,  currentPage])

    return {
        items: data,
        loading: isLoading,
        nextPage: () => setCurrentPage(currentPage + 1),
    }
}
