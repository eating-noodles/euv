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

  it('branch switch', () => {
    let observed = reactive({ flag: false, num1: 1, num2: 2 })

    let count = 0;
    effect(() => {
      let reslut = observed.flag ? observed.num1 : observed.num2
      count++
    })

    expect(count).toBe(1)
    observed.flag = true
    expect(count).toBe(2)
    observed.num2 = 3
    expect(count).toBe(2)
  })
})
