// @ts-nocheck
/** @jsxImportSource theme-ui */

import Layout from '../Layout'
import { Button } from 'theme-ui'

const ViewLayout = ({
    project,
    frameComponent,
    biddersComponent,
    royaltiesComponent,
    burnDesign,
}) => {

    return (
        <Layout project={project}>
            <>
                <div
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 3,
                    }}
                >
                    <Button onClick={burnDesign} variant="red">
                        Burn
                    </Button>
                </div>
                <div
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    {frameComponent}
                </div>
                <div
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 3,
                    }}
                >
                    {biddersComponent}
                </div>

                <div
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 3,
                    }}
                >
                    {royaltiesComponent}
                </div>
            </>
        </Layout>
    )
}

export default ViewLayout
