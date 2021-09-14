// @ts-nocheck
/** @jsxImportSource theme-ui */

import { useRecoilValue } from 'recoil'
import { accountState } from 'state/account'
import { Menu } from '@cura/components'

export default function MenuContainer({ base }: { base: string }) {
    const { accountId } = useRecoilValue(accountState)

    return <Menu accountId={accountId} base={base} />
}
