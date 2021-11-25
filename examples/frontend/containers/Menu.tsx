// @ts-nocheck
/** @jsxImportSource theme-ui */

import { useRecoilValue } from 'recoil'
import { useNearHooksContainer } from '@cura/hooks'
import { Menu } from '@cura/components'

export default function MenuContainer({
    base,
    nextLinkWrapper,
}: {
    base: string
    nextLinkWrapper: (link: string, children: JSX.Element) => JSX.Element
}) {
    const { accountId } = useNearHooksContainer()

    return (
        <Menu
            accountId={accountId}
            base={base}
            nextLinkWrapper={nextLinkWrapper}
        />
    )
}
