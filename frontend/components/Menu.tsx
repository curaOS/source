/** @jsxImportSource theme-ui */

import { useContext } from 'react'
import { appStore } from '../state/app'
import { Text, Divider, Flex, NavLink } from 'theme-ui'
import Link from 'next/link'

export default function Menu() {
    const { state } = useContext(appStore)
    const { account } = state

    return (
        <div>
            <Divider />
            <Flex as="nav" sx={{ justifyContent: 'space-around' }}>
                {account?.accountId ? (
                    <>
                        <Link href="/share/create">
                            <NavLink>Create</NavLink>
                        </Link>
                        <Link href="/share">
                            <NavLink>View</NavLink>
                        </Link>
                        <Link href="/share/explore">
                            <NavLink>Explore</NavLink>
                        </Link>
                    </>
                ) : (
                    <Text>Please connect to use dapp.</Text>
                )}
            </Flex>
            <Divider />
        </div>
    )
}
