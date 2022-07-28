## 0728

### 对于effect的理解
1. 响应式系统流程只有两个步骤
  * 读取对象属性的时候，收集依赖进行保存
  * 对象属性被修改的时候，循环执行依赖Set中保存的副作用函数
2. effect.ts中封装的effect方法以及所有的逻辑，只为了一个目的，那就是`为了让对象的属性的依赖能够被正确的收集和触发`。

### 单元测试`var auto increment`
1. 位于`src/reactivity/tests/effect.spec.ts`
2. `observed.foo`的`trigger`方法执行包含在副作用函数的执行周期内。`trigger`方法执行完成以后，整个effect副作用函数才算执行完成。
