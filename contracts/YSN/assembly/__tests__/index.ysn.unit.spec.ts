import { storage, u128 } from "near-sdk-as";
import { VMContext, VM } from "near-mock-vm";
import { ft_balance_of, ft_metadata, ft_mine_to, ft_total_supply, init, SUPPLY_KEY } from '../index';
import { toYocto } from '../../../utils';

const condo = "condo"
const keith = "keith"

describe("- CONTRACT -", () => {
  beforeEach(() => {
    VMContext.setSigner_account_id(condo)
  })

  it("xxx returns metadata", () => {
    const contractMetadata = ft_metadata();


    expect(contractMetadata.spec).toBe("ft-1.0.0");
    expect(contractMetadata.name).toBe("Ysn");
    expect(contractMetadata.symbol).toBe("YSN");
  })

  it("xxx returns zero supply", () => {
    expect(ft_total_supply()).toBe("0");
  })

  it("xxx inits", () => {
    init();

    expect(storage.hasKey(SUPPLY_KEY)).toBe(true);
  })
});


describe("- HODLER -", () => {
  beforeEach(() => {
    VMContext.setSigner_account_id(condo);

    init();
  })

  it("xxx returns zero balance", () => {
    const balance = ft_balance_of(keith);

    expect(balance).toBe("0");
  })

  it("xxx throws if not whitelisted precedessor", () => {
    expect(() => {
      ft_mine_to(keith, toYocto(1));
    }).toThrow("Caller not whitelisted");
  })

  it("xxx mines to account", () => {
    VMContext.setPredecessor_account_id("v1.share.ysn.testnet")

    ft_mine_to(keith, toYocto(1));
    
    const newBalance = ft_balance_of(keith);
    
    expect(newBalance).toBe(toYocto(1).toString());
  })
});