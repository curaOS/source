import { VMContext } from "near-mock-vm";
import { util } from 'near-sdk-as'
import { design, nft_metadata } from "../index";
import { Extra } from '../models';

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

    expect(metadataExtra.instructions).not.toBeNull();
  })
});