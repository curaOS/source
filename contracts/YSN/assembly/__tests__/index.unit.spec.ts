import { VMContext } from "near-mock-vm";
import { ft_metadata } from '../index';

const condo = "condo"

describe("- CONTRACT -", () => {
  beforeEach(() => {
    VMContext.setSigner_account_id(condo)
  })

  it("xxx returns metadata", () => {
    const contractMetadata = ft_metadata();


    expect(contractMetadata.spec).toBe("ft-1.0.0");
    expect(contractMetadata.name).toBe("Yassine");
    expect(contractMetadata.symbol).toBe("YSN");
  })
});