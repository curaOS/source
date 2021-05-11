import { VM, VMContext } from "near-mock-vm";
import { logging, util } from 'near-sdk-as'
import { design, nft_metadata, claimMyDesign } from "../index";
import { Royalty, Design, stakers, SHARE_PRICE, DESIGN_PRICE, Extra, designs } from '../models';

const SEED_EXAMPLE = 100;
const condo = "condo"

describe("- DESIGN -", () => {
  beforeEach(() => {
    VMContext.setSigner_account_id(condo)
  })
  
  it("xxx creates new", () => {
    const newDesign = design()

    expect(newDesign.owner_id).toBe(condo)

  });
})


describe("- CONTRACT -", () => {
  it("xxx returns metadata", () => {
    const contractMetadata = nft_metadata();


    expect(contractMetadata.spec).toBe("nft-1.0.0");
    expect(contractMetadata.name).toBe("Share");
    expect(contractMetadata.symbol).toBe("SHARE");
  })
});

describe("- ROYALTY -", () => {
  beforeEach(() => {
    VMContext.setSigner_account_id(condo)
  })
  

  it("xxx creates Design object with Royalty type design", () => {
    const newDesign  = design();

    expect(newDesign).not.toBeNull();
    expect(newDesign.metadata).not.toBeNull();
    expect(newDesign.royalty).not.toBeNull();

    const metadataExtra = util.parseFromBytes<Extra>(newDesign.metadata.extra);

    expect(metadataExtra.value).toBe(DESIGN_PRICE);
  })
});