// @ts-nocheck
/** @jsxImportSource theme-ui */

import { utils } from 'near-api-js'
import { useRouter } from 'next/router'
import ExploreLayout from '../../../containers/Layouts/Explore'
import { useNFTMethod, useNearHooksContainer } from '@cura/hooks'
import { mapPathToProject } from 'utils/path-to-project'
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

    return (
        <ExploreLayout
            project={project}
            items={media || []}
            loadMore={() => null}
            totalSupply={media?.length || 0}
            baseUrl={`/${project}/`}
        />
    )
}

export default CCProject
