import { ROYALTY_PERCENTAGE } from './index'
import { YSN_ADDRESS } from '../../accounts'

type AccountId = string

export const FT_CONTRACT: string = YSN_ADDRESS

@nearBindgen
export class Royalty {
    split_between: Map<AccountId, u32> = new Map()
    percentage: u32 = 0
    constructor() {
        /** 25% of future sales goes to FT */
        this.split_between.set(FT_CONTRACT, ROYALTY_PERCENTAGE)
        this.percentage = ROYALTY_PERCENTAGE
    }
}
