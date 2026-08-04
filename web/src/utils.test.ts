import { describe, expect, it } from "vitest"

import { getInitials } from "./utils"

describe("getInitials", () => {
  it("uses at most the first two words", () => {
    expect(getInitials("Orqestra Demo Sandbox")).toBe("OD")
  })
})
