// @ts-nocheck
/** @jsxImportSource theme-ui */

import { Button } from 'theme-ui'
import { utils } from 'near-api-js'
import { useRouter } from 'next/router'
import Layout from '../../../components/Layout'
import CreatorShare from '../../../components/CreatorShare'
import Design from '../../../components/Design'
import Bidders from '../../../components/Bidders'
import { alertMessageState, indexLoaderState } from '../../../state/recoil'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import useNFTContract, { useNFTMethod } from 'hooks/useNFTContract'
import { useMarketMethod } from 'hooks/useMarketContract'
import { accountState } from 'state/account'

const CONTRACT_VIEW_GAS = utils.format.parseNearAmount('0.00000000010') // 100 Tgas
const CONTRACT_BURN_GAS = utils.format.parseNearAmount('0.00000000029') // 290 Tgas
const MARKET_ACCEPT_BID_GAS = utils.format.parseNearAmount('0.00000000025') // 250 Tgas
const YOCTO_NEAR = utils.format.parseNearAmount('0.000000000000000000000001')

const HARDCODED_ROYALTY_ADDRESS = process.env.YSN_ADDRESS
const HARDCODED_ROYALTY_SHARE = '2500'

const MLProjectCreate = ({}) => {
    const router = useRouter()

    const setAlertMessage = useSetRecoilState(alertMessageState)
    const setIndexLoader = useSetRecoilState(indexLoaderState)

    const { accountId } = useRecoilValue(accountState)

    return (
        <Layout project={`ml/${router.query.project}`}>
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
                    <Button mx="2" mt="1" onClick={null} variant="uno">
                        Design
                    </Button>
                    <Button mx="2" mt="1" onClick={null} variant="due">
                        Claim
                    </Button>
                </div>
                Hi, i'm {router.query.project}
            </div>
        </Layout>
    )
}

export default MLProjectCreate
