// @ts-nocheck
/** @jsxImportSource theme-ui */

import Layout from '../Layout'
import { Box, Link, Spinner } from 'theme-ui'
import InfiniteScroll from 'react-infinite-scroll-component'
import { MediaObject } from '@cura/components'
import { getFrameWidth } from 'utils/frame-width'

const ExploreLayout = ({ project, items, loadMore, totalSupply, baseUrl }) => {
    const designDimension = getFrameWidth(true)

    return (
        <Layout project={project}>
            <Box sx={{ textAlign: 'center' }}>
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
                                m={[1, 2, 3]}
                                sx={{
                                    display: 'inline-flex',
                                    position: 'relative',
                                    ':hover': {
                                        opacity: '0.8',
                                    },
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
                                    width={designDimension}
                                    height={designDimension}
                                />
                            </Link>
                        )
                    })}
                </InfiniteScroll>
            </Box>
        </Layout>
    )
}

export default ExploreLayout
