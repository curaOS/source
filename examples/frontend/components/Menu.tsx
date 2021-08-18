// @ts-nocheck
/** @jsxImportSource theme-ui */

import { Text, Divider, Flex, NavLink } from 'theme-ui'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'
import { accountState } from 'state/account'

export default function Menu({ base }: { base: string }) {
    const { accountId } = useRecoilValue(accountState)

    return (
        <div>
            <Divider />
            <Flex as="nav" sx={{ justifyContent: 'space-around' }}>
                {accountId ? (
                    <>
                        <Link href={`/${base}/create`}>
                            <NavLink>Create</NavLink>
                        </Link>
                        <Link href={`/${base}`}>
                            <NavLink>View</NavLink>
                        </Link>
                        <Link href={`/${base}/explore`}>
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
