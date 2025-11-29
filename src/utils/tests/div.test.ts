import { division } from "../div";

describe("division", () => {
    it("should divide two numbers", () => {
        expect(division(4, 2)).toBe(2);
    });
    it("should throw an error if the second number is zero", () => {
        expect(() => division(1, 0)).toThrow();
    });
});
