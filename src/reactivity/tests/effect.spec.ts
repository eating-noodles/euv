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

  it('nested effect', () => {
    const observed = reactive({ foo: 1, bar: 2 })
    
    let temp1, temp2
    let count1 = 0, count2 = 0
    effect(() => {
      effect(() => {
        count2++
        temp2 = observed.bar
      })
      count1++
      temp1 = observed.foo
    })

    expect(count1).toBe(1)
    expect(count2).toBe(1)

    observed.foo = 3
    // wrong
    // expect(count1).toBe(1)
    // expect(count2).toBe(2)
    
    // correct
    expect(count1).toBe(2)
    expect(count2).toBe(2)
  })

  it('var auto increment', () => {
    const observed = reactive({ foo: 1 })
    effect(() => {
      observed.foo++
    })

    expect(observed.foo).toBe(2)

    observed.foo = 3
    expect(observed.foo).toBe(4)
  })
})
