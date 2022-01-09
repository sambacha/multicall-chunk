import * as helpers from "./helpers"
// @ponicode
describe("helpers.callWithRetries", () => {
    test("0", async () => {
        let result: any = await helpers.callWithRetries(1.0, () => "return callback value")
        expect(result).toBe("return callback value")
    })

    test("1", async () => {
        expect.assertions(1)
        try {
            await helpers.callWithRetries(NaN, () => "")
        } catch (e) {
            expect(e.message).toBe("multicall: retries exceeded")
        }
    })

    test("2", async () => {
        expect.assertions(1)
        try {
            await helpers.callWithRetries(-1.0, () => "")
        } catch (e) {
            expect(e.message).toBe("multicall: retries exceeded")
        }
    })

    test("3", async () => {
        expect.assertions(1)
        try {
            await helpers.callWithRetries(0.0, () => "")
        } catch (e) {
            expect(e.message).toBe("multicall: retries exceeded")
        }
    })
})
