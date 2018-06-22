'use strict'
import State from './state'
import Actions from './actions'
import Mutations from './mutations'
import Getters from './getters'
import Modules from './modules'
/**
 * 组装modules并导出store
 */
/* eslint-disable */
const Store = {
  state: State,
  mutations: Mutations,
  actions: Actions,
  getters: Getters,
  modules: Modules
}
export default Store
