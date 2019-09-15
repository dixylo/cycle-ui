import axios from 'axios'
import server from '@/config'

const state = {
  types: [],
  type: null,
  status: ''
}

const getters = {
  getTypes: state => state.types,
  getTheType: state => state.type,
  typeStatus: state => state.status
}

const actions = {
  async fetchAllTypes ({ commit }) {
    commit('type_request')
    try {
      const response = await axios.get(`${server}/api/types`)
      commit('types_success', response.data)
    } catch (err) {
      console.log(err)
      commit('type_error')
    }
  },
  async fetchTypeById ({ commit }, id) {
    commit('type_request')
    try {
      const response = await axios.get(`${server}/api/types/${id}`)
      commit('type_success', response.data)
    } catch (err) {
      console.log(err)
      commit('type_error')
    }
  }
}

const mutations = {
  type_request: state => state.status = 'loading',
  types_success: (state, types) => {
    state.status = 'success'
    state.types = types
  },
  type_success: (state, type) => {
    state.status = 'success'
    state.type = type
  },
  type_error: state => state.status = 'error'
}

export default {
  state,
  getters,
  actions,
  mutations
}