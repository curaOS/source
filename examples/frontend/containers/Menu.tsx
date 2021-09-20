// @ts-nocheck
/** @jsxImportSource theme-ui */

import { useRecoilValue } from 'recoil'
import { useNearHooksContainer } from '@cura/hooks'
import { Menu } from '@cura/components'

export default function MenuContainer({ base }: { base: string }) {
    const { accountId } = useNearHooksContainer()

    return <Menu accountId={accountId} base={base} />
}
