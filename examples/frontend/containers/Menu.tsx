// @ts-nocheck
/** @jsxImportSource theme-ui */

import { useNearHooksContainer } from '@cura/hooks'
import { Menu } from '@cura/components'

export default function MenuContainer({
    base,
    nextLinkWrapper,
    activeLink,
}: {
    base: string
    nextLinkWrapper: (link: string, children: JSX.Element) => JSX.Element
    activeLink: string
}) {
    const { accountId } = useNearHooksContainer()

    return (
        <Menu
            accountId={accountId}
            base={base}
            nextLinkWrapper={nextLinkWrapper}
            activeLink={activeLink}
        />
    )
}
