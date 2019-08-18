<template>
  <div class='container'>
    <h2>My Rentals</h2>
    <div v-if='!rentals.length'>
      <div v-if='loading'>
        <img class='loading' alt='Loading...' src='@/assets/loading.png' />
      </div>
      <div v-else-if='error'>
        Something failed. Please try again.
        <button class='' @click='reload'>Reload Page</button>
      </div>
      <div v-else>
        <h3>You don't have any rentals.</h3>
      </div>
    </div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>Model</th>
            <th>Size</th>
            <th>Color</th>
            <th>Ordered</th>
            <th>To Collect</th>
            <th>Rented Out</th>
            <th>Returned</th>
            <th>$/hr</th>
            <th>Fee</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody v-for='rental in rentals' :key='rental._id'>
          <tr>
            <td>{{ rental.cycle.model }}</td>
            <td>{{ rental.cycle.size }}</td>
            <td>{{ rental.cycle.color }}</td>
            <td>{{ rental.timeOrdered }}</td>
            <td>{{ rental.timeToCollect }}</td>
            <td>{{ rental.timeRentedOut}}</td>
            <td>{{ rental.timeReturned }}</td>
            <td>{{ rental.cycle.hourlyRentalRate }}</td>
            <td>{{ rental.rentalFee }}</td>
            <td v-if='!rental.timeRentedOut'>
              <div v-if='loading'>
                <img class='loading' alt='Loading...' src='@/assets/loading.png' />
              </div>
              <div v-else>
                <span @click.prevent='removeRental(rental._id)'>
                  Delete
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click='reload'>
        <div v-if='loading'>
          <img class='loading' alt='Loading...' src='@/assets/loading.png'/>
        </div>
        <div v-else>Refresh</div>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'rentals',
  created () {
    if (!this.rentals.length) this.fetchMyRentals()
  },
  computed: {
    ...mapGetters(['getRentals', 'rentalStatus']),
    rentals: function () {
      return this.getRentals
    },
    loading: function () {
      return this.rentalStatus === 'loading'
    },
    error: function () {
      return this.rentalStatus === 'error'
    }
  },
  methods: {
    ...mapActions(['fetchMyRentals', 'deleteRental']),
    reload () {
      this.fetchMyRentals()
    },
    removeRental (id) {
      const isConfirmed = window.confirm('Are you sure to delete this rental?')
      if (!isConfirmed) return

      this.deleteRental(id)
        .then(() => alert('You have deleted the rental successfully.'))
        .catch(err => {
          alert('Deletion failed. Please try again.')
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
th, td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
tr:nth-child(even) {
  background-color: #dddddd;
}
</style>