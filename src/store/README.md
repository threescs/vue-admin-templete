# Vuex 使用规范
------
## 组件仍然保有局部状态
使用 Vuex 并不意味着你需要将所有的状态放入 Vuex。虽然将所有的状态放到 Vuex 会使状态变化更显式和易调试，但也会使代码变得冗长和不直观。如果有些状态严格属于单个组件，最好还是作为组件的局部状态。你应该根据你的应用开发需要进行权衡和确定。

## Mutation 需遵守 Vue 的响应规则
   * 最好提前在你的 store 中初始化好所有所需属性。
   * 当需要在对象上添加新属性时，你应该
    > * 使用 Vue.set(obj, 'newProp', 123) 或者
    > * 以新对象替换老对象。例如，利用 stage-3 的对象   展开运算符我们可以这样写： 
        ```javascript 
            state.obj = { ...state.obj, newProp: 123 }
        ```

## Mutation 必须是同步函数 mutation 都是同步事务 任何由 "increment" 导致的状态变更都应该在此刻完成。(https://vuex.vuejs.org/zh/guide/mutations.html)
    ```javascript 
        store.commit('increment')
     ```
## Action 执行异步事物(https://vuex.vuejs.org/zh/guide/actions.html)
    * Action 提交的是 mutation，而不是直接变更状态。
    * Action 可以包含任意异步操作。
    * Action 通过 store.dispatch 方法触发：
        > * store.dispatch('increment')

## Module 模块化store (https://vuex.vuejs.org/zh/guide/modules.html)
   当状态对象比较庞大时，应该拆分成一些独立module
   
## 组合 Action
Action 通常是异步的，那么如何知道 action 什么时候结束呢？更重要的是，我们如何才能组合多个 action，以处理更加复杂的异步流程？

首先，你需要明白 store.dispatch 可以处理被触发的 action 的处理函数返回的 Promise，并且 store.dispatch 仍旧返回 Promise:
    ```javascript 
        actions: {
            actionA ({ commit }) {
                return new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit('someMutation')
                    resolve()
                }, 1000)
                })
            }
        }
        // 调用
        store.dispatch('actionA').then(() => {
        // ...
        })
    ```
    