import { VM } from "near-mock-vm";
import { draw } from "../index"

describe("init", () => {
  it("should draw", () => {
    draw()
    
    log(VM.logs())
  });
})
