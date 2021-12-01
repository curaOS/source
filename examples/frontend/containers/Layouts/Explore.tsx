// @ts-nocheck
/** @jsxImportSource theme-ui */

import Layout from '../Layout'
import { Box, Link, Spinner, AspectRatio } from 'theme-ui'
import InfiniteScroll from 'react-infinite-scroll-component'
import { MediaObject } from '@cura/components'

const ExploreLayout = ({ project, items, loadMore, totalSupply, baseUrl }) => {

    return (
        <Layout project={project}>
            <Box sx={{ textAlign: 'center', my: 30, mx: 'auto', maxWidth: 900 }}>
                <InfiniteScroll
                    dataLength={items.length}
                    next={loadMore}
                    hasMore={totalSupply > items.length}
                    loader={
                        <Box width="100%" mt={2}>
                            <Spinner />
                        </Box>
                    }
                >
                    {items.map((item, index) => {
                        return (
                            <Link
                                key={index}
                                href={`${baseUrl}${item.id}`}
                                m={[21, 21, 21, 30]}
                                sx={{
                                    display: 'inline-block',
                                    width: [225, 340],
                                    position: 'relative',
                                    ':hover': {
                                        opacity: '0.8',
                                    },
                                }}
                            >
                                <AspectRatio
                                    ratio={1}
                                    sx={{
                                        bg: 'gray.3',
                                        alignItems: 'center',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        mb: 36,
                                        width: '100%',
                                        height: '100%',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <div
                                        sx={{
                                            position: 'absolute',
                                            height: '100%',
                                            width: '100%',
                                            zIndex: 1,
                                        }}
                                    ></div>
                                    <MediaObject
                                        mediaURI={`https://arweave.net/${item.metadata.media}`}
                                        width={'100%'}
                                        height={'100%'}
                                    />
                                </AspectRatio>
                            </Link>
                        )
                    })}
                </InfiniteScroll>
            </Box>
        </Layout>
    )
}

export default ExploreLayout
