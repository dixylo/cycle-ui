import axios from 'axios'
import config from '@/env'

const server = config.dev.apiServer
axios.defaults.baseURL = `${server}/api`

const state = {
  users: [],
  user: null,
  status: ''
}

const getters = {
  getUsers: state => state.users,
  userStatus: state => state.status
}

const actions = {
  fetchAllUsers ({ commit }) {
    const token = localStorage.getItem('token')
    if (!token) return alert('Please log in to proceed.')

    commit('user_request')
    
    axios({
      method: 'get',
      url: '/users',
      headers: { Authorization: token }
    })
      .then(response => {
        commit('users_success', response.data)
      })
      .catch(err => {
        commit('user_error')
        console.log(err)
      })
  },
  fetchUserById ({ commit }, id) {
    const token = localStorage.getItem('token')
    if (!token) return alert('Please log in to proceed.')

    commit('user_request')
    
    axios({
      method: 'get',
      url: `/users/${id}`,
      headers: { Authorization: token }
    })    
      .then(response => {
        commit('user_success', response.data)
      })
      .catch(err => {
        commit('user_error')
        console.log(err)
      })
  },
  fetchMe ({ commit }) {
    const token = localStorage.getItem('token')
    if (!token) return alert('Please log in to proceed.')

    commit('user_request')
    
    axios({
      method: 'get',
      url: `/users/self/get`,
      headers: { Authorization: token }
    })    
      .then(response => {
        commit('user_success', response.data)
      })
      .catch(err => {
        commit('user_error')
        console.log(err)
      })
  },
  deleteUser ({ commit }, id) {
    const token = localStorage.getItem('token')
    if (!token) return alert('Please log in to proceed.')

    return new Promise((resolve, reject) => {
      commit('user_request')
      
      axios({
        method: 'delete',
        url: `/users/${id}`,
        headers: { Authorization: token }
      })
        .then(response => {
          commit('delete_user_success', id)
          resolve(response)
        })
        .catch(err => {
          commit('user_error')
          reject(err)
        })
    })
  }
}

const mutations = {
  user_request: state => state.status = 'loading',
  users_success: (state, users) => {
    state.users = users
    state.status = 'success'
  },
  user_success: (state, user) => {
    state.user = user
    state.status = 'success'
  },
  delete_user_success: (state, id) => {
    state.status = 'success'
    state.user = null
    state.users = state.users.filter(u => u._id.toString() !== id)
  },
  user_error: state => state.status = 'error'
}

export default {
  state,
  getters,
  actions,
  mutations
}