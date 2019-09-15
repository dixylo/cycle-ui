import axios from 'axios'
import server from '@/config'

const state = {
  models: [],
  model: null,
  status: ''
}

const getters = {
  getModels: state => state.models,
  getTheModel: state => state.model,
  modelStatus: state => state.status
}

const actions = {
  async fetchAllModels ({ commit }) {
    commit('model_request')
    try {
      const response = await axios.get(`${server}/api/models`)
      commit('models_success', response.data)
    } catch (err) {
      console.log(err)
      commit('model_error')
    }
  },
  async fetchModelById ({ commit }, id) {
    commit('model_request')
    try {
      const response = await axios.get(`${server}/api/models/${id}`)
      commit('model_success', response.data)
    } catch (err) {
      console.log(err)
      commit('model_error')
    }
  }
}

const mutations = {
  model_request: state => state.status = 'loading',
  models_success: (state, models) => {
    state.status = 'success'
    state.models = models
  },
  model_success: (state, model) => {
    state.status = 'success'
    state.model = model
  },
  model_error: state => state.status = 'error'
}

export default {
  state,
  getters,
  actions,
  mutations
}