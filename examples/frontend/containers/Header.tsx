// @ts-nocheck
/** @jsxImportSource theme-ui */

import { Header } from '@cura/components'
import { alertMessageState } from '../state/recoil'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export default function HeaderContainer({
    base,
    accountId,
    onSignIn,
    onSignOut,
    title,
}: {
    base: string
    accountId?: string
    onSignIn: () => void
    onSignOut: () => void
    title: string
}) {
    const alertMessage = useRecoilValue(alertMessageState)
    const setAlertMessage = useSetRecoilState(alertMessageState)

    return (
        <Header
            base={base}
            accountId={accountId}
            onSignIn={onSignIn}
            onSignOut={onSignOut}
            alertMessage={alertMessage}
            setAlertMessage={setAlertMessage}
            title={title}
        />
    )
}
