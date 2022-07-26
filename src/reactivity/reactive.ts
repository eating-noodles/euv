import { track, trigger } from './effect'
export const reactive = (raw) => {
  const observed = new Proxy(raw, {
    get(target, key) {
      const res = Reflect.get(target, key)

      // todo: track deps
      track(target, key)
    
      return res
    },
    set(target, key, value) { 
      const res = Reflect.set(target, key, value)
      
      // todo: trigger deps
      trigger(target, key)

      return res
    }
  })
  return observed
}
