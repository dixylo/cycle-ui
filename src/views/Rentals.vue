<template>
  <div class='container'>
    <div class='item-box'>
      <p class='box-title'>My Rentals</p>
      <div v-if='!rentals.length'>
        <Skeleton :status='rentalStatus' :onReload='reload' />
      </div>
      <div class='card-container-background' v-else>
        <div class='card-container'>
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
                <td>{{ formatColor(rental.cycle.color) }}</td>
                <td>{{ formatTime(rental.timeOrdered) }}</td>
                <td>{{ formatTime(rental.timeToCollect) }}</td>
                <td>{{ formatTime(rental.timeRentedOut) }}</td>
                <td>{{ formatTime(rental.timeReturned) }}</td>
                <td>{{ rental.cycle.hourlyRentalRate }}</td>
                <td>{{ rental.rentalFee }}</td>
                <td>
                  <div v-if='!rental.timeRentedOut'>
                    <span @click.prevent='removeRental(rental._id)'>
                      Delete
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <Button
            class='user-panel-button'
            :status='rentalStatus'
            :onClick='reload'
          >
            Refresh
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Skeleton from '@/components/Skeleton'
import Button from '@/components/Button'

export default {
  name: 'rentals',
  components: { Skeleton, Button },
  created () {
    this.fetchMyRentals()
  },
  computed: {
    ...mapGetters(['getRentals', 'rentalStatus']),
    rentals: function () {
      return this.getRentals
    }
  },
  methods: {
    ...mapActions(['fetchMyRentals', 'deleteRental']),
    reload () {
      this.fetchMyRentals()
    },
    formatColor (color) {
      return color.replace(/\//g, ', ')
    },
    formatTime (time) {
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
.item-box::before {
	border-top: 50px solid #376FB2;
  border-bottom: 50px solid transparent;
	border-left: 70vw solid #376FB2;
	border-right: 30vw solid #00A9E0;
}

.card-container {
  flex-direction: column;
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

.user-panel-button {
  width: 200px;
}

@media screen and (max-width: 1024px) {
  .item-box::before {
    border-top-width: 40px;
    border-bottom-width: 40px;
  }

  .box-title {
    font-size: 40px;
  }

  .box-title::after {
    font-size: 80px;
  }
}

@media screen and (max-width: 820px) {
  table {
    font-size: 18px;
  }
}

@media screen and (max-width: 760px) {
  table {
    font-size: 16px;
  }
}

@media screen and (max-width: 690px) {
  .item-box::before {
    border-top-width: 30px;
    border-bottom-width: 30px;
  }

  .box-title {
    font-size: 30px;
  }

  .box-title::after {
    font-size: 60px;
  }

  table {
    font-size: 14px;
  }
}

@media screen and (max-width: 630px) {
  table {
    font-size: 12px;
  }
}

@media screen and (max-width: 600px) {
  .card-container {
    overflow: scroll;
  }
}
</style>