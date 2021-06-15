/** @jsxImportSource theme-ui */

import { Heading } from 'theme-ui'
import { alpha } from '@theme-ui/color'
import Image from 'next/image'
import Link from 'next/link'

const Index = () => {
    return (
        <div
            sx={{
                display: 'flex',
                flexDirection: ['column', 'row'],
                justifyContent: 'space-around',
                alignItems: 'center',
                height: '100vh',
                p: [80, 0, 50, 200],
                backgroundImage: (t) => `
		linear-gradient(
			to right,
			${alpha('secondary', 1)(t)},
			${alpha('primary', 0.5)(t)}
		)
		`,
            }}
        >
            {/* <Heading as="h3">YSN</Heading> */}
            <Link href="/ysn">
                <Heading as="h1">YSN</Heading>
            </Link>
            <Link href="/share">
                <Heading as="h1">SHARE</Heading>
            </Link>
            <Link href="/watchs">
                <Heading as="h1">WATCHS</Heading>
            </Link>
            <Link href="/cloths">
                <Heading as="h1">CLOTHS</Heading>
            </Link>
            <div
                sx={{
                    marginTop: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <a
                    sx={{
                        ':hover': {
                            opacity: '0.5',
                        },
                    }}
                    href="https://twitter.com/Yassine_2024"
                >
                    <Image
                        src="/twitter-logo-black.png"
                        alt="Black logo"
                        width={30}
                        height={25}
                    />
                </a>
            </div>
        </div>
    )
}

export default Index
