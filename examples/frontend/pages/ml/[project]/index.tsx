// @ts-nocheck
/** @jsxImportSource theme-ui */

import { utils } from 'near-api-js'
import { useRouter } from 'next/router'
import ExploreLayout from '../../../containers/layouts/Explore'
import { useNFTViewMethod, useNearHooksContainer } from '@cura/hooks'
import { useStatusUpdate } from 'utils/hooks-helpers'

const CONTRACT_VIEW_GAS = utils.format.parseNearAmount(`0.00000000010`) // 100 Tgas

const MLProject = () => {
    const router = useRouter()

    const { accountId } = useNearHooksContainer()

    const { updateStatus } = useStatusUpdate()

    const project = `ml/${router.query.project}`

    const { data: media } = useNFTViewMethod(
        `ml${router.query.project}.ysn-1_0_0.ysn.testnet`,
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
            type="image"
        />
    )
}

export default MLProject
