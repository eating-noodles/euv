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
  activeFn.deps.push(depsSet)
}

export const trigger = (target, key) => {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  
  const deps = depsMap.get(key)
  if (!deps) return 
  
  // note: 防止无限循环 
  // 触发依赖时，一边循环依赖Set执行副作用函数，
  // 执行副作用函数时，又会把副作用函数重新加入到依赖Set中。这样就会导致无限循环
  const newDeps = new Set<any>(deps)
  newDeps.forEach(dep => {
    dep.deps.forEach(el => {
      el.delete(dep)
    })
    dep.deps.length = 0
    dep.run()
  });
}

class ReactiveEffect {
  private _fn: Function
  public deps: Array<Set<Function>> = []

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
