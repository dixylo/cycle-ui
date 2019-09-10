<template>
  <div class='container'>
    <div class='item-box'>
      <div class='card-container'>
        <p v-for='(tab, index) in tabs' :key='index'
          class='box-title'
          :data-pseudo-content="index === selectedTabIndex ? '__' : ''"
          @click.prevent='switchTab(index)'
        >
          {{ tab.text }}
        </p>
      </div>
      <div class='card-container-background'>
        <div v-if='list.length'>
          <Table class='table'
            :header='tabs[selectedTabIndex].header'
            :data='list'
            :actions='tabs[selectedTabIndex].actions'
          />
          <Button
            class='refresh'
            :status='status'
            :onClick='reload'
          >
            Refresh
          </Button>
        </div>
        <div v-else>
          <Skeleton :status='status' :onReload='reload' />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Table from '@/components/Table'
import Skeleton from '@/components/Skeleton'
import Button from '@/components/Button'

export default {
  name: 'admin',
  components: { Table, Skeleton, Button },
  created () {
    this.fetchAllRentals()
    this.fetchAllUsers()
  },
  data () {
    return {
      selectedTabIndex: 0,
      tabs: [{
        text: 'Rentals',
        value: 'rentals',
        header: [{
          text: 'Username',
          value: 'user.username'
        }, {
          text: 'Phone',
          value: 'user.phone'
        }, {
          text: 'Model',
          value: 'cycle.model'
        }, {
          text: 'Size',
          value: 'cycle.size'
        }, {
          text: 'Color',
          value: 'cycle.color'
        }, {
          text: 'Time Ordered',
          value: 'timeOrdered'
        }, {
          text: 'Time to Collect',
          value: 'timeToCollect'
        }, {
          text: 'Time Rented',
          value: 'timeRentedOut'
        }, {
          text: 'Time Returned',
          value: 'timeReturned'
        }],
        actions: [{
          text: 'Rent',
          callback: this.beginRentout
        }, {
          text: 'Return',
          callback: this.completeRental
        }, {
          text: 'Delete',
          callback: this.removeRental
        }]
      }, {
        text: 'Users',
        value: 'users',
        header: [{
          text: 'Username',
          value: 'username'
        }, {
          text: 'Email',
          value: 'email'
        }, {
          text: 'Phone',
          value: 'phone'
        }, {
          text: 'Is Admin',
          value: 'isAdmin'
        }],
        actions: [{
          text: 'Delete',
          callback: this.removeUser
        }]
      }]
    }
  },
  computed: {
    ...mapGetters(['getRentals', 'getUsers', 'rentalStatus', 'userStatus']),
    list: function () {
      const field = this.tabs[this.selectedTabIndex].value
      switch (field) {
        case 'rentals':
          return this.getRentals
        case 'users':
          return this.getUsers
        default:
          return
      }
    },
    status: function () {
      const field = this.tabs[this.selectedTabIndex].value
      switch (field) {
        case 'rentals':
          return this.rentalStatus
        case 'users':
          return this.userStatus
        default:
          return
      }
    },
  },
  methods: {
    ...mapActions([
      'fetchAllRentals',
      'fetchAllUsers',
      'startRentout',
      'finishRental',
      'deleteRental',
      'deleteUser'
    ]),
    reload () {
      const field = this.tabs[this.selectedTabIndex].value
      switch (field) {
        case 'rentals':
          this.fetchAllRentals()
          break
        case 'users':
          this.fetchAllUsers()
          break
        default:
          return
      }
    },
    switchTab (index) {
      this.selectedTabIndex = index
    },
    beginRentout: function (id) {
      const isConfirmed = window.confirm('Are you sure to start this rentout?')
      if (!isConfirmed) return

      this.startRentout(id)
        .then(() => alert('You have started this rentout successfully.'))
        .catch(err => {
          alert('Rentout failed. Please try again.')
          console.log(err)
        })
    },
    completeRental: function (id) {
      const isConfirmed = window.confirm('Are you sure to finish this rental?')
      if (!isConfirmed) return

      this.finishRental(id)
        .then(() => alert('You have finished this rental successfully.'))
        .catch(err => {
          alert('Rental-finishing failed. Please try again.')
          console.log(err)
        })
    },
    removeRental: function (id) {
      const isConfirmed = window.confirm('Are you sure to delete this rental?')
      if (!isConfirmed) return

      this.deleteRental(id)
        .then(() => alert('You have deleted this rental successfully.'))
        .catch(err => {
          alert('Deletion failed. Please try again.')
          console.log(err)
        })
    },
    removeUser: function (id) {
      const isConfirmed = window.confirm('Are you sure to delete this user?')
      if (!isConfirmed) return

      this.deleteUser(id)
        .then(() => alert('You have deleted this user successfully.'))
        .catch(err => {
          alert('Deletion failed. Please try again.')
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.item-box {
  position: relative;
  padding: 3rem 0;
  width: 100%;
  background-color: #FFF;
}

.item-box::before {
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

.card-container {
  justify-content: center;
}

.box-title {
  margin: 0 .5em;
  cursor: pointer;
  transition: 0.3s;
}

.box-title:hover {
  color: skyblue;
}

.box-title::after {
  content: attr(data-pseudo-content);
  bottom: -10%;
}

.table {
  margin: 0 auto;
}

.refresh {
  margin: 20px auto;
  padding: .5em 3em;
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;
  color: #FFF;
  background-color: #006ccc;
  border-color: #006ccc;
}

.refresh:hover {
  background-color: #003C71;
  border-color: #003C71;
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

@media screen and (max-width: 950px) {
  table {
    font-size: 18px;
  }
}

@media screen and (max-width: 870px) {
  table {
    font-size: 16px;
  }
}

@media screen and (max-width: 790px) {
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

@media screen and (max-width: 715px) {
  table {
    font-size: 12px;
  }
}

@media screen and (max-width: 640px) {
  .card-container-background {
    overflow: scroll;
  }
}

@media screen and (max-width: 500px) {
  .item-box::before {
    border-top-width: 25px;
    border-bottom-width: 25px;
  }

  .box-title {
    font-size: 25px;
  }

  .box-title::after {
    font-size: 50px;
  }
}
</style>