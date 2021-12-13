// @ts-nocheck
/** @jsxImportSource theme-ui */

import Layout from '../Layout'
import { Button, Box, AspectRatio } from 'theme-ui'

const ViewLayout = ({
    project,
    frameComponent,
    biddersComponent,
    royaltiesComponent,
    burnDesign,
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
                        mt: 3,
                        display: 'inline-block',
                        verticalAlign: 'top',
                        float: 'right',
                        width: ['100%', '100%', '100%', '40%'],
                    }}
                >
                    <Button onClick={burnDesign} variant="borderless">
                        BURN
                    </Button>
                    {biddersComponent}
                    {royaltiesComponent}
                </Box>
            </Box>
        </Layout>
    )
}

export default ViewLayout
