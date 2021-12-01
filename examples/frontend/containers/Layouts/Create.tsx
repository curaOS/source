// @ts-nocheck
/** @jsxImportSource theme-ui */

import Layout from '../Layout'
import { Button } from 'theme-ui'
import { getFrameWidth } from 'utils/frame-width'

const CreateLayout = ({
    project,
    frameComponent,
    royaltiesComponent,
    retrieveData,
    claimDesign,
}) => {
    const frameDimension = getFrameWidth()

    return (
        <Layout project={project}>
            <div
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <div
                    sx={{
                        textAlign: 'center',
                        mb: 3,
                    }}
                >
                    <Button mx="2" mt="1" onClick={retrieveData} variant="uno">
                        Design
                    </Button>
                    <Button mx="2" mt="1" onClick={claimDesign} variant="due">
                        Claim
                    </Button>
                </div>
                <div
                    sx={{
                        alignSelf: 'center',
                        alignItems: 'center',
                        bg: 'gray.3',
                        display: 'flex',
                        height: frameDimension,
                        justifyContent: 'center',
                        width: frameDimension,
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
                    {royaltiesComponent}
                </div>
            </div>
        </Layout>
    )
}

export default CreateLayout
