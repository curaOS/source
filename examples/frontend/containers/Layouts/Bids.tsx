// @ts-nocheck
/** @jsxImportSource theme-ui */

import Layout from '../Layout'

const BidsLayout = ({ children, project }) => {

    return (
        <Layout project={project}>
            <div
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 3,
                }}
            >
                {children}
            </div>
        </Layout>
    )
}

export default BidsLayout
