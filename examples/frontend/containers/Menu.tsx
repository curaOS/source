// @ts-nocheck
/** @jsxImportSource theme-ui */

import { Menu } from '@cura/components'

export default function MenuContainer({
    accountId,
    base,
    nextLinkWrapper,
    activeLink,
}: {
    accountId: string
    base: string
    nextLinkWrapper: (link: string, children: JSX.Element) => JSX.Element
    activeLink: string
}) {
    return (
        <Menu
            base={base}
            nextLinkWrapper={nextLinkWrapper}
            activeLink={activeLink}
            isDisconnected={accountId ? false : true}
        />
    )
}
