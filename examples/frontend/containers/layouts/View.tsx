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
                        display: ['block', 'block', 'block','inline-block'],
                        width: ['100%', '100%', '70%', '50%'],
                        mr: [0, 0, 'auto', 4],
                        ml: [0, 0, 'auto', 0],
                        mb: [4, 4, 0, 0],
                        textAlign:'center',
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
                            width: ['100%', '100%', '100%', '70%'],
                            maxHeight: ['100%', '100%', '100%', '70%'],
                            marginLeft: 'auto',
                            marginRight:['auto', 'auto', 'auto', '10%']
                        }}
                    >
                        {frameComponent}
                    </AspectRatio>
                </Box>
                <Box
                    sx={{
                        mt: 0,
                        display: ['block', 'block', 'block','inline-block'],
                        verticalAlign: 'top',
                        margin: 'auto',
                        width: ['100%', '100%', '70%', '40%'],
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
