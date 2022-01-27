// @ts-nocheck
/** @jsxImportSource theme-ui */

import { useRouter } from 'next/router'
import ExploreLayout from '../../../containers/layouts/Explore'
import { useNFTViewMethod, useNearHooksContainer } from '@cura/hooks'
import { mapPathToProject } from 'utils/path-to-project'
import { useStatusUpdate } from 'utils/hooks-helpers'

const CCProject = () => {
    const router = useRouter()

    const { updateStatus } = useStatusUpdate()

    const { accountId } = useNearHooksContainer()

    const project = `cc/${router.query.project}`

    const { data: media } = useNFTViewMethod(
        `${mapPathToProject(router.asPath)}`,
        `nft_tokens_for_owner`,
        {
            account_id: accountId,
        },
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
