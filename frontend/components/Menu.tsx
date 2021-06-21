/** @jsxImportSource theme-ui */

import { Text, Divider, Flex, NavLink } from 'theme-ui'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'
import { accountState } from 'state/account'

export default function Menu() {
    const { accountId } = useRecoilValue(accountState)

    return (
        <div>
            <Divider />
            <Flex as="nav" sx={{ justifyContent: 'space-around' }}>
                {accountId ? (
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
