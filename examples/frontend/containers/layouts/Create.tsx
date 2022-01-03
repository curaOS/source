// @ts-nocheck
/** @jsxImportSource theme-ui */

import Layout from '../Layout'
import { Box, Button, AspectRatio } from 'theme-ui'

const CreateLayout = ({
    project,
    frameComponent,
    royaltiesComponent,
    retrieveData,
    claimDesign,
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
                        width: ['100%', '100%', '70%', '50%'],
                        maxWidth: '90vh',
                        mr: [0, 0, 0, 4],
                        mb: [4, 4, 0, 0],
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
                            marginLeft: 'auto',
                            marginRight:['auto', 'auto', 'auto', '10%']
                        }}
                    >
                        {frameComponent}
                    </AspectRatio>
                </Box>
                <Box
                    sx={{
                        ml: 3,
                        mt: 0,
                        display: 'inline-block',
                        verticalAlign: 'top',
                        float: 'right',
                        width: ['100%', '100%', '100%', '40%'],
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: ['row', 'row', 'row', 'column'],
                            alignItems: 'start',
                            rowGap: 18,
                            mb: [30, 30, 30, 30],
                        }}
                    >
                        <Button
                            onClick={retrieveData}
                            variant="borderless"
                            mr={3}
                        >
                            DESIGN
                        </Button>
                        <Button onClick={claimDesign} variant="borderless">
                            CLAIM
                        </Button>
                    </Box>
                    {royaltiesComponent}
                </Box>
            </Box>
        </Layout>
    )
}

export default CreateLayout
