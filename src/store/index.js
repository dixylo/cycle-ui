import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import users from './modules/users'
import rentals from './modules/rentals'
import cycles from './modules/cycles'
import models from './modules/models'
import brands from './modules/brands'
import types from './modules/types'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    users,
    rentals,
    cycles,
    models,
    brands,
    types
  }
})