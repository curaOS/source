// @ts-nocheck
/** @jsxImportSource theme-ui */

import Layout from '../Layout'
import { Box, Divider, AspectRatio } from 'theme-ui'

const ExploreViewLayout = ({
    project,
    frameComponent,
    metaComponent,
    royaltiesComponent,
    bidCreateComponent,
}) => {
    return (
        <Layout project={project}>
            <Box
                sx={{
                    my: [44, 44, 44, 66],
                }}
            >
                <Box
                    sx={{
                        display: 'inline-block',
                        width: ['100%', '100%', '100%', '50%'],
                        maxWidth: '90vh',
                        mr: [0, 0, 0, 4],
                        mb: [4, 4, 4, 0],
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
                        }}
                    >
                        {frameComponent}
                    </AspectRatio>
                </Box>
                <Box
                    sx={{
                        ml: 3,
                        display: 'inline-block',
                        verticalAlign: 'top',
                        float: 'right',
                        width: ['100%', '100%', '100%', '40%'],
                    }}
                >
                    <Box
                        sx={{
                            width: ['100%', '100%', '100%', 200],
                        }}
                    >
                        {metaComponent}
                    </Box>
                    <Box mt={20}>{royaltiesComponent}</Box>
                    {bidCreateComponent}
                </Box>
            </Box>
        </Layout>
    )
}

export default ExploreViewLayout
