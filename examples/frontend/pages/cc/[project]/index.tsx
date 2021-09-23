// @ts-nocheck
/** @jsxImportSource theme-ui */

import { utils } from 'near-api-js'
import { useRouter } from 'next/router'
import Layout from '../../../containers/Layout'
import { useNFTMethod, useNearHooksContainer } from '@cura/hooks'
import Link from 'next/link'
import { mapPathToProject } from 'utils/path-to-project'
import { RenderIframe } from '@cura/components'
import { getFrameWidth } from 'utils/frame-width'
import { useStatusUpdate } from 'utils/hooks-helpers'

const CONTRACT_VIEW_GAS = utils.format.parseNearAmount('0.00000000010') // 100 Tgas

const CCProject = ({}) => {
    const router = useRouter()

    const { updateStatus } = useStatusUpdate()

    const { accountId } = useNearHooksContainer()

    const project = `cc/${router.query.project}`

    const { data: media } = useNFTMethod(
        `${mapPathToProject(router.asPath)}`,
        'nft_tokens_for_owner',
        {
            account_id: accountId,
        },
        CONTRACT_VIEW_GAS,
        updateStatus
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
                            <div sx={{ m: 20 }}>
                                <Link key={id} href={`/${project}/${id}`}>
                                    <div
                                        sx={{
                                            position: 'relative',
                                            display: 'inline-block',
                                            cursor: 'pointer',
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
                                                backgroundColor:
                                                    'rgba(0,0,0,0.0)',
                                            }}
                                        ></div>
                                        <div
                                            sx={{
                                                mx: [1, 2, 3],
                                                my: [1, 2, 3],
                                                zIndex: 2,
                                            }}
                                        >
                                            {metadata?.media && (
                                                <RenderIframe
                                                    mediaURI={`https://arweave.net/${metadata.media}`}
                                                    width={frameDimension}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                </div>
            </>
        </Layout>
    )
}

export default CCProject
