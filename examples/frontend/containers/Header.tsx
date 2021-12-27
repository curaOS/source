// @ts-nocheck
/** @jsxImportSource theme-ui */

import { Header } from '@cura/components'
import { alertMessageState } from '../state/recoil'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useColorMode } from 'theme-ui'

export default function HeaderContainer({
    base,
    accountId,
    onSignIn,
    onSignOut,
    title,
    logo,
    nextLinkWrapper,
}: {
    base: string
    accountId?: string
    onSignIn: () => void
    onSignOut: () => void
    title: string
    logo: string
    nextLinkWrapper: (link: string, children: JSX.Element) => JSX.Element
}) {
    const alertMessage = useRecoilValue(alertMessageState)
    const setAlertMessage = useSetRecoilState(alertMessageState)

    const [mode, setMode] = useColorMode()
    return (
        <Header
            base={base}
            accountId={accountId}
            onSignIn={onSignIn}
            onSignOut={onSignOut}
            alertMessage={alertMessage}
            setAlertMessage={setAlertMessage}
            title={title}
            logo={mode == 'dark' ? '/logoWhite.svg' : '/logo.png'}
            nextLinkWrapper={nextLinkWrapper}
            mode={mode}
            setMode={setMode}
        />
    )
}
