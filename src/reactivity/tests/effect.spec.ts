import { reactive } from "../reactive"
import { effect } from '../effect';

describe('effect', () => {
  it('basic object reactive', () => {
    let raw = { foo: 1 }
    let observed = reactive(raw)

    let dummy
    effect(() => {
      dummy = observed.foo
    })

    expect(dummy).toBe(1)
    
    observed.foo = 7

    expect(dummy).toBe(7)

  })
})
