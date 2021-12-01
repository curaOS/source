// @ts-nocheck
/** @jsxImportSource theme-ui */

import Layout from '../Layout'
import { Box, Divider } from 'theme-ui'

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
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 12,
                }}
            >
                {frameComponent}
                {metaComponent}
                <Divider sx={{ width: 300 }} />
                {royaltiesComponent}
                <Divider sx={{ width: 300 }} />
                {bidCreateComponent}
            </Box>
        </Layout>
    )
}

export default ExploreViewLayout
