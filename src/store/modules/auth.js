import axios from 'axios'
import config from '@/env'

const server = config.dev.apiServer

const state = {
  user: null,
  token: localStorage.getItem('token') || '',
  status: '',
  isAdmin: false
}

const getters = {
  getCurrentUser: state => state.user,
  isLoggedIn: state => !!state.token && !!state.user,
  isAdminLoggedIn: state => state.isAdmin,
  authStatus: state => state.status
}

const actions = {
  signup ({ commit }, newUser) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios.post(`${server}/api/users`, newUser)
        .then(response => {
          const token = response.headers.authorization
          const user = response.data
          localStorage.setItem('token', token)
          commit('auth_success', { token, user })
          resolve(response)
        })
        .catch(err => {
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)
        })
    })
  },
  login ({ commit }, authData) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios.post(`${server}/api/auth`, authData)
        .then(response => {
          const token = response.headers.authorization
          const user = response.data
          localStorage.setItem('token', token)
          commit('auth_success', { token, user })
          resolve(response)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
    })
  },
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      commit('logout')
      localStorage.removeItem('token')
      resolve()
    })
  }
}

const mutations = {
  auth_request: state => state.status = 'loading',
  auth_success: (state, { token, user }) => {
    state.status = 'success'
    state.token = token
    state.user = user
    state.isAdmin = user.isAdmin
  },
  auth_error: state => state.status = 'error',
  logout: state => {
    state.status = ''
    state.token = ''
    state.user = null
    state.isAdmin = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}