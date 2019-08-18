import axios from 'axios'
import config from '@/env'

const server = config.dev.apiServer

const state = {
  brands: [],
  brand: null,
  status: ''
}

const getters = {
  getBrands: state => state.brands,
  getTheBrand: state => state.brand,
  brandStatus: state => state.status
}

const actions = {
  async fetchAllBrands ({ commit }) {
    commit('brand_request')
    try {
      const response = await axios.get(`${server}/api/brands`)
      commit('brands_success', response.data)
    } catch (err) {
      console.log(err)
      commit('brand_error')
    }
  },
  async fetchBrandById ({ commit }, id) {
    commit('brand_request')
    try {
      const response = await axios.get(`${server}/api/brands/${id}`)
      commit('brand_success', response.data)
    } catch (err) {
      console.log(err)
      commit('brand_error')
    }
  }
}

const mutations = {
  brand_request: state => state.status = 'loading',
  brands_success: (state, brands) => {
    state.status = 'success'
    state.brands = brands
  },
  brand_success: (state, brand) => {
    state.status = 'success'
    state.brand = brand
  },
  brand_error: state => state.status = 'error'
}

export default {
  state,
  getters,
  actions,
  mutations
}