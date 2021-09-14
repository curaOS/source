// @ts-nocheck
/** @jsxImportSource theme-ui */

import { Button } from 'theme-ui'
import { utils } from 'near-api-js'
import { useRouter } from 'next/router'
import Layout from '../../../components/Layout'
import { alertMessageState, indexLoaderState } from '../../../state/recoil'
import { useRecoilValue } from 'recoil'
import { useNFTMethod } from 'hooks/useNFTContract'
import { accountState } from 'state/account'
import Link from 'next/link'
import { getFrameWidth } from 'utils/frame-width'

const CONTRACT_VIEW_GAS = utils.format.parseNearAmount('0.00000000010') // 100 Tgas

const MLProject = ({}) => {
    const router = useRouter()

    const { accountId } = useRecoilValue(accountState)

    const project = `ml/${router.query.project}`

    const { data: media } = useNFTMethod(
        `ml${router.query.project}.ysn-1_0_0.ysn.testnet`,
        'nft_tokens_for_owner',
        {
            account_id: accountId,
        },
        CONTRACT_VIEW_GAS
    )

    const frameDimension = getFrameWidth(true)

    return (
        <Layout project={project}>
            <>
                <div
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}
                >
                    {media &&
                        media.map(({ id, metadata }) => (
                            <Link href={`/${project}/${id}`}>
                                <div
                                    sx={{
                                        cursor: 'pointer',
                                        mx: [1, 2, 3],
                                        my: [1, 2, 3],
                                        ':hover': {
                                            opacity: '0.8',
                                        },
                                    }}
                                >
                                    <img
                                        src={`https://arweave.net/${metadata.media}`}
                                        width={frameDimension}
                                    />
                                </div>
                            </Link>
                        ))}
                </div>
            </>
        </Layout>
    )
}

export default MLProject
