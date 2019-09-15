import axios from 'axios'
import server from '@/config'

axios.defaults.baseURL = `${server}/api`

const state = {
  rentals: [],
  rental: null,
  status: ''
}

const getters = {
  getRentals: state => state.rentals,
  getTheRental: state => state.rental,
  rentalStatus: state => state.status
}

const actions = {
  async fetchAllRentals ({ commit }) {
    const token = localStorage.getItem('token')
    if (!token) return alert('Please log in to proceed.')

    commit('rental_request')

    const response = await axios({
      method: 'get',
      url: '/rentals',
      headers: { Authorization: token }
    })

    commit('rentals_success', response.data)
  },
  async fetchRentalById ({ commit }, rentalId) {
    const token = localStorage.getItem('token')
    if (!token) return alert('Please log in to proceed.')

    commit('rental_request')

    const response = await axios({
      method: 'get',
      url: `/rentals/${rentalId}`,
      headers: { Authorization: token }
    })

    commit('rental_success', response.data)
  },
  fetchMyRentals ({ commit }) {
    const token = localStorage.getItem('token')
    if (!token) return alert('Please log in to proceed.')
    
    commit('rental_request')

    axios({
      method: 'get',
      url: '/rentals/of/mine',
      headers: { Authorization: token }
    })
      .then(response => {
        commit('rentals_success', response.data)
      })
      .catch(err => {
        commit('rental_error')
        console.log(err)
      })
  },
  async fetchUserRentals ({ commit }, userId) {
    const token = localStorage.getItem('token')
    if (!token) return alert('Please log in to proceed.')
    
    commit('rental_request')

    const response = await axios({
      method: 'get',
      url: `/rentals/user/${userId}`,
      headers: { Authorization: token }
    })

    commit('rentals_success', response.data)
  },
  createRental ({ commit }, newRental) {
    const token = localStorage.getItem('token')
    if (!token) return alert('Please log in to proceed.')

    return new Promise((resolve, reject) => {
      commit('rental_request')
      
      axios({
        method: 'post',
        url: '/rentals',
        headers: { Authorization: token },
        data: newRental
      })
        .then(response => {
          commit('rental_success', response.data)
          resolve(response)
        })
        .catch(err => {
          commit('rental_error')
          reject(err)
        })
    })
  },
  startRentout ({ commit }, id) {
    const token = localStorage.getItem('token')
    if (!token) return alert('Please log in to proceed.')

    return new Promise((resolve, reject) => {
      commit('rental_request')
      
      axios({
        method: 'put',
        url: `/rentals/${id}`,
        headers: { Authorization: token }        
      })
        .then(response => {
          commit('rentout_success', response.data)
          resolve(response)
        })
        .catch(err => {
          commit('rental_error')
          reject(err)
        })
    })
  },
  finishRental ({ commit }, id) {
    const token = localStorage.getItem('token')
    if (!token) return alert('Please log in to proceed.')

    return new Promise((resolve, reject) => {
      commit('rental_request')
      
      axios({
        method: 'put',
        url: `/returns/${id}`,
        headers: { Authorization: token }        
      })      
        .then(response => {
          commit('return_success', response.data)
          resolve(response)
        })
        .catch(err => {
          commit('rental_error')
          reject(err)
        })
    })
  },
  deleteRental ({ commit, state }, id) {
    const token = localStorage.getItem('token')
    if (!token) return alert('Please log in to proceed.')

    const rental = state.rentals.find(r => r._id.toString() === id)
    if (rental.timeRentedOut && !rental.timeReturned) {
      return alert('You cannot delete a rental already started.')
    }
    const urlSuffix = rental.timeRentedOut ? 'returns' : 'rentals'
     
    return new Promise((resolve, reject) => {
      commit('rental_request')
      
      axios({
        method: 'delete',
        url: `/${urlSuffix}/${id}`,
        headers: { Authorization: token }
      })
        .then(response => {
          commit('delete_rental_success', id)
          resolve(response)
        })
        .catch(err => {
          commit('rental_error')
          reject(err)
        })
    })
  }
}

const mutations = {
  rental_request: state => state.status = 'loading',
  rentals_success: (state, rentals) => {
    state.status = 'success'
    state.rentals = rentals
  },
  rental_success: (state, rental) => {
    state.status = 'success'
    state.rental = rental
  },
  rentout_success: (state, rentout) => {
    state.status = 'success'
    if (state.rental) state.rental = rentout
    if (state.rentals.length) {
      const index = state.rentals.findIndex(r => r._id.toString() === rentout._id.toString())
      if (index !== -1) {
        state.rentals[index] = rentout
      }
    }
  },
  return_success: (state, finishedRental) => {
    state.status = 'success'
    if (state.rental) state.rental = finishedRental
    if (state.rentals.length) {
      const index = state.rentals.findIndex(r => r._id.toString() === finishedRental._id.toString())
      if (index !== -1) {
        state.rentals[index] = finishedRental
      }
    }
  },
  delete_rental_success: (state, id) => {
    state.status = 'success'
    state.rental = null
    state.rentals = state.rentals.filter(r => r._id.toString() !== id)
  },
  rental_error: state => state.status = 'error',
}

export default {
  state,
  getters,
  actions,
  mutations
}