// @ts-nocheck
/** @jsxImportSource theme-ui */

import { useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { useRouter } from 'next/router'
import { utils } from 'near-api-js'

import { useNFTViewMethod, useNFTContract } from '@cura/hooks'

import ExploreLayout from '../../../containers/layouts/Explore'
import { mapPathToProject } from 'utils/path-to-project'
import { alertMessageState } from '../../../state/recoil'

const CONTRACT_RANDOM_GAS = utils.format.parseNearAmount(`0.00000000020`) // 200 Tgas

const NFT_PER_PAGE = 4

const Explore = () => {
    const router = useRouter()
    const setAlertMessage = useSetRecoilState(alertMessageState)

    const contractAdress = router && mapPathToProject(router.asPath)
    const project = `share`

    // get total supply, which we need to detect if all NFTs are loaded
    const { data: totalSupply } = useNFTViewMethod(
        contractAdress,
        `nft_total_supply`,
        {}
    )

    // hook that contains all the logic of explore page
    const { items, nextPage, notLogged } = useNFTExplore(contractAdress, NFT_PER_PAGE)

    function loadMore() {
        try {
            nextPage()
        } catch (error) {
            console.error(error)
            setAlertMessage(error.toString())
        }
    }

    return (
        <ExploreLayout
            project={project}
            items={items}
            loadMore={loadMore}
            totalSupply={notLogged ? 0 : totalSupply}
            baseUrl={`/${project}/explore/`}
        />
    )
}

export default Explore

function useNFTExplore(contractAdress: string, limitPerPage = 4) {
    const [currentPage, setCurrentPage] = useState(0)
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [notLogged, setNotLogged] = useState(true)

    const from_index = Math.floor(limitPerPage * currentPage)

    const { contract } = useNFTContract(contractAdress)

    async function getData() {
        const newData = await contract.nft_tokens({
            from_index: from_index ? from_index.toString() : `0`, // prevent toString() from converting 0 to NaN
            limit: limitPerPage,
        })
        setData([...data, ...newData])
        setIsLoading(false)
    }

    // Excute function if contract change or currentPage change
    useEffect(() => {
        let signedAddress = localStorage.getItem('contractAddress');

        // make sure the user is logged in and the contract is the right contract
        if (
            contract?.account?.accountId &&
            contract.contractId == contractAdress &&
            contract.contractId == signedAddress
        ) {
            setNotLogged(false)
            setIsLoading(true)
            getData()
        } else {
            setNotLogged(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contract, currentPage])

    return {
        items: data,
        loading: isLoading,
        nextPage: () => setCurrentPage(currentPage + 1),
        notLogged: notLogged,
    }
}
