import { alertMessageState, indexLoaderState } from '../state/recoil'
import { useSetRecoilState } from 'recoil'

export function useStatusUpdate() {
    const setAlertMessage = useSetRecoilState(alertMessageState)
    const setIndexLoader = useSetRecoilState(indexLoaderState)

    const updateStatus = (error, data, validParams) => {
        if (!error && !data && validParams) {
            setIndexLoader(true)
        }

        if (error) {
            setAlertMessage(error.toString())
            setIndexLoader(false)
        }

        if (data) {
            setIndexLoader(false)
        }
    }

    return { updateStatus }
}
