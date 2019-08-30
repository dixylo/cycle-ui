<template>
  <div class='container'>
    <div class='rental-box'>
      <p class='box-title'>My Rentals</p>
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
      <div class='table-box' v-else>
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
              <td>{{ formatTime(rental.timeOrdered) }}</td>
              <td>{{ formatTime(rental.timeToCollect) }}</td>
              <td>{{ formatTime(rental.timeRentedOut) }}</td>
              <td>{{ formatTime(rental.timeReturned) }}</td>
              <td>{{ rental.cycle.hourlyRentalRate }}</td>
              <td>{{ rental.rentalFee }}</td>
              <td>
                <div v-if='!rental.timeRentedOut'>
                  <div v-if='loading'>
                    <img class='loading' alt='Loading...' src='@/assets/loading.png' />
                  </div>
                  <div v-else>
                    <span @click.prevent='removeRental(rental._id)'>
                      Delete
                    </span>
                  </div>
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
    formatTime: function (time) {
      if (!time) return
      return time.slice(0, 16).replace('T', ', ')
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
.rental-box {
  position: relative;
}

.rental-box::before {
  content: '';
	width: 0;
	height: 0;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
	border-top: 50px solid #376FB2;
  border-bottom: 50px solid transparent;
	border-left: 70vw solid #376FB2;
	border-right: 30vw solid #00A9E0;
}

.box-title {
  position: relative;
  color: #003C71;
  font-size: 50px;
  font-style: italic;
  font-weight: bold;
  margin: 0 auto;
  padding: 100px 0 0;
}

.box-title::after {
  content: '__';
  color: #00A9E0;
  display: block;
  font-size: 100px;
  font-style: normal;
  position: absolute;
  left: 50%;
  bottom: -35%;
  transform: translateX(-50%);
}

.table-box {
  margin: 0 auto;
  padding: 80px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  background-color: azure;
}

table {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  margin: 0 auto;
  background-color: white;
  max-width: 1024px;
}

tr:nth-child(even){
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}

tr:hover td {
  border-color: #fff;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: #4CAF50;
  color: white;
}

span {
  color: #00a3cf;
  cursor: pointer;
  transition: .3s
}

span:hover {
  color: #00cbff;
  transform: scale(1.02)
}

button {
  margin: 20px auto;
  padding: 1em 3em;
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;
  color: #FFF;
  background-color: #006ccc;
  border-color: #006ccc;
}

button:hover {
  background-color: #003C71;
  border-color: #003C71;
}

button:focus {
  outline: none;
}
</style>