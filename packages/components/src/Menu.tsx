// @ts-nocheck
/** @jsxImportSource theme-ui */

import { Text, Divider, Flex, NavLink } from 'theme-ui'

export function Menu({ accountId, base }: { accountId: string; base: string }) {
    return (
        <div>
            <Divider />
            <Flex as="nav" sx={{ justifyContent: 'space-around' }}>
                {accountId ? (
                    <>
                        <a href={`/${base}/create`}>
                            <NavLink>Create</NavLink>
                        </a>
                        <a href={`/${base}`}>
                            <NavLink>View</NavLink>
                        </a>
                        <a href={`/${base}/explore`}>
                            <NavLink>Explore</NavLink>
                        </a>
                    </>
                ) : (
                    <Text>Please connect to use dapp.</Text>
                )}
            </Flex>
            <Divider />
        </div>
    )
}
