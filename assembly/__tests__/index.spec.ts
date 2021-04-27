import { VM, VMContext } from "near-mock-vm";
import { design } from "../index"

const condo = "condo"

describe("design", () => {
  beforeEach(() => {
    VMContext.setSigner_account_id(condo)
  })

  afterEach(() => {
    // cleanup
  })
  
  it("should create new", () => {
    const newDesign = design()
    log(VM.logs())

    expect(newDesign.owner).toBe(condo)
    expect(newDesign.instructions.length).toBeGreaterThan(0)
    expect(newDesign.seed).toBeGreaterThan(0) 

  });
})