const targetMap = new WeakMap()
let activeFn

export const track = (target, key) => {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  let depsSet = depsMap.get(key)
  if (!depsSet) {
    depsSet = new Set()
    depsMap.set(key, depsSet)
  }
  depsSet.add(activeFn)
}

export const trigger = (target, key) => {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  
  const deps = depsMap.get(key)
  if (!deps) return 
  console.log(deps)
  deps.forEach(dep => {
    dep.run()
  });
}

class ReactiveEffect {
  private _fn: Function

  constructor(fn) {
    this._fn = fn
  }

  run() {
    activeFn = this
    this._fn()
  }
}

export const effect = (fn) => {
  const reactiveEffect = new ReactiveEffect(fn)
  reactiveEffect.run()
}
