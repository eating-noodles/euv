import { reactive } from "../reactive"

describe('reactive', () => {
  it('object reactive', () => {
    let raw = { foo: 1 }
    let observed = reactive(raw)

    expect(observed).not.toBe(raw)
    expect(observed.foo).toBe(1)


  })
})
