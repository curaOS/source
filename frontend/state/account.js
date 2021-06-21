import { atom } from 'recoil'

export const accountState = atom({
    key: 'accountState',
    default: {
        accountId: null,
    },
})
