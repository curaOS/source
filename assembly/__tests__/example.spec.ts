import { VM } from "near-mock-vm";
import { design } from "../index"

describe("init", () => {
  it("should design", () => {
    design()
    log(VM.logs())
  });
})
