// @ts-nocheck
/** @jsxImportSource theme-ui */

import { Text, Divider, Flex, NavLink } from 'theme-ui'

export function Menu({
    accountId,
    base,
    nextLinkWrapper,
}: {
    accountId: string
    base: string
    nextLinkWrapper: (link: string, children: JSX.Element) => JSX.Element
}) {
    return (
        <div>
            <Divider />
            <Flex as="nav" sx={{ justifyContent: 'space-around' }}>
                {accountId ? (
                    <>
                        {nextLinkWrapper(
                            `/${base}/create`,
                            <a href={`/${base}/create`}>
                                <NavLink>Create</NavLink>
                            </a>
                        )}
                        {nextLinkWrapper(
                            `/${base}`,
                            <a href={`/${base}`}>
                                <NavLink>View</NavLink>
                            </a>
                        )}
                        {nextLinkWrapper(
                            `/${base}/explore`,
                            <a href={`/${base}/explore`}>
                                <NavLink>Explore</NavLink>
                            </a>
                        )}
                    </>
                ) : (
                    <Text>Please connect to use dapp.</Text>
                )}
            </Flex>
            <Divider />
        </div>
    )
}
