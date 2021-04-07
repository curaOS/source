import { hello_world } from '..'

describe("example", () => {
  it("should return hello world", () => {
    expect(hello_world()).toStrictEqual("hello world")
  }) 
});
