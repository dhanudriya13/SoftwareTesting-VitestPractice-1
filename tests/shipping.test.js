import {describe, it, expect} from "vitest"

import {
  getWeightTier,
  getBaseRate,
  calculateShippingCost,
  isFreeShipping,
  estimateDeliveryDays,
} from "../src/shipping.js";

describe("BVA: getWeightTier()", () => {
  it.each([
    [-0.01, "RangeError"],
    [0, "empty"],
    [0.01,"light"]
  ]) ("weight = %s should return %s", (weight, expected) => {
    if (expected === "RangeError") {
      expect(() => getWeightTier(weight))
        .toThrow(RangeError);
    } else {
      expect(getWeightTier(weight)).toBe(expected);
    }
  });
});
