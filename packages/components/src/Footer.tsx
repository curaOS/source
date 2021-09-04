// @ts-nocheck
/** @jsxImportSource theme-ui */

export function Footer({}: {}) {
    return (
        <div
            sx={{
                margin: `0 auto`,
                maxWidth: 960,
                padding: `1rem 2rem`,
            }}
        >
            <div
                sx={{
                    margin: `1rem auto`,
                    background: `black`,
                    maxWidth: 960,
                    padding: `0.02rem 0rem`,
                }}
            />
            <footer
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
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
                        <img
                            src="/twitter-logo-black.png"
                            alt="Black logo"
                            width={30}
                            height={25}
                        />
                    </a>
                </div>
            </footer>
        </div>
    )
}
