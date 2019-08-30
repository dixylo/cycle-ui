<template>
  <div class='container admin'>
    <div v-if='!list.length'>
      <div v-if='loading'>
        <img class='loading' alt='Loading...' src='@/assets/loading.png' />
      </div>
      <div v-else-if='error'>
        Something failed. Please try again.
        <button class='' @click='reload'>Reload Page</button>
      </div>
      <div v-else>
        <h3>No Data.</h3>
      </div>
    </div>
    <div v-else>
      <div class='tab'>
        <button v-for='(tab, index) in tabs' :key='index'
          class='tablink'
          :class="{'tablink-active': index === selectedTabIndex}"
          @click='switchTab(index)'
        >
          {{ tab.text }}
        </button>
      </div>
      <div class='tabcontent'>
        <Table class='table'
          :header='tabs[selectedTabIndex].header'
          :data='list(selectedTabIndex)'
          :actions='tabs[selectedTabIndex].actions'
        />
        <button class='refresh' @click='reload(tabs[selectedTabIndex].value)'>
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
import Table from '@/components/Table'

export default {
  name: 'admin',
  components: { Table },
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
    loading: function () {
      const status = this.rentalStatus === 'loading' || this.userStatus === 'loading'
      return status
    },
    error: function () {
      const status = this.rentalStatus === 'error' || this.userStatus === 'error'
      return status
    }
  },
  methods: {
    ...mapActions(['fetchAllRentals', 'fetchAllUsers', 'startRentout', 'finishRental', 'deleteRental', 'deleteUser']),
    reload (field) {
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
    list (index) {
      const field = this.tabs[index].value
      switch (field) {
        case 'rentals':
          return this.getRentals
        case 'users':
          return this.getUsers
        default:
          return
      }
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
.admin {
  position: relative;
}

.admin::before {
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

.tab {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding-top: 100px;
  max-width: 1024px;
}

.tablink {
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.3s;
  position: relative;
  color: #003C71;
  font-size: 50px;
  font-weight: bold;
  margin: 0 .5em;
}

.tablink:hover {
  color: skyblue;
}

.tablink-active {
  position: relative;
}

.tablink-active::after {
  content: '___';
  color: #00A9E0;
  display: block;
  font-size: 80px;
  font-style: normal;
  position: absolute;
  left: 50%;
  bottom: -35%;
  transform: translateX(-50%);
}

.tabcontent {
  padding: 80px 0;
  background-color: azure;
}

.table {
  margin: 0 auto;
}

.refresh {
  margin: 20px auto;
  padding: 1em 3em;
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

.refresh:focus {
  outline: none;
}
</style>