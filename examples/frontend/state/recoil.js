import { atom } from 'recoil'

export const alertMessageState = atom({
    key: 'alertMessageState',
    default: '',
})

export const indexLoaderState = atom({
    key: 'indexLoaderState',
    default: false,
})
