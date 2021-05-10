import { VM, VMContext } from "near-mock-vm";
import { env } from 'near-sdk-as'
import { design, nft_metadata } from "../index";
import { generate } from '../generate';
import { Royalty, Design, stakers, SHARE_PRICE, DESIGN_PRICE } from '../models';

const SEED_EXAMPLE = 100;
const condo = "condo"

describe("design", () => {
  beforeEach(() => {
    VMContext.setSigner_account_id(condo)
  })

  afterEach(() => {
    // cleanup
  })
  
  it("creates new", () => {
    const newDesign = design()

    expect(newDesign.owner_id).toBe(condo)

  });
})


describe("contract", () => {
  it("returns metadata", () => {
    const contractMetadata = nft_metadata();


    expect(contractMetadata.spec).toBe("nft-1.0.0");
    expect(contractMetadata.name).toBe("Share");
    expect(contractMetadata.symbol).toBe("SHARE");
  })
});