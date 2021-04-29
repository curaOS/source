import { VM, VMContext } from "near-mock-vm";
import { env } from 'near-sdk-as'
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
    let orig = VM.outcome();

    const newDesign = design()
    log(VM.logs())

    let newOutcome = VM.outcome();

    expect(newDesign.owner).toBe(condo)
    expect(newDesign.instructions.length).toBeGreaterThan(0)
    expect(newDesign.seed).toBeGreaterThan(0)

    log(orig.storage_usage)
    log(newOutcome.storage_usage)

    expect(orig.storage_usage).toBe(newOutcome.storage_usage, "No storage used");
  });
})