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
            class='user-panel-button'
            :status='status'
            :onClick='reload'
          >
            Refresh
          </Button>
        </div>
        <div v-else>
          <Skeleton :status='status' :onReload='reload' />
        </div>
        <Modal 
          :visibility='isModalVisible'
          :onOk='handleOk'
          :onCancel='handleCancel'
          :header='modalHeader'
          :body='modalBody'
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Table from '@/components/Table'
import Skeleton from '@/components/Skeleton'
import Button from '@/components/Button'
import Modal from '@/components/Modal'

export default {
  name: 'admin',
  components: { Table, Skeleton, Button, Modal },
  created () {
    this.fetchAllRentals()
    this.fetchAllUsers()
  },
  data () {
    return {
      isModalVisible: false,
      handleCancel: null,
      modalHeader: '',
      modalBody: '',
      modalCallback: null,
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
          text: 'Finish',
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
    showModal (header, body, callback, cancel) {
      this.modalHeader = header
      this.modalBody = body
      this.modalCallback = callback
      this.handleCancel = cancel
      this.isModalVisible = true
    },
    handleOk () {
      this.isModalVisible = false
      if (this.modalCallback) this.modalCallback()
    },
    switchTab (index) {
      this.selectedTabIndex = index
    },
    beginRentout: function (id) {
      const rental = this.list.find(r => r._id.toString() === id)
      if (rental.timeRentedOut) {
        return this.showModal('Rentout Denied', 'You cannot start a rental already started or finished.')
      }

      this.showModal(
        'Start Rentout',
        'Are you sure to start this rentout?',
        () => this.startRentout(id)
          .then(() => this.showModal('Rentout Started', 'You have started this rentout successfully.'))
          .catch(err => {
            this.showModal('Rentout Failed', 'Please try again.')
            console.log(err)
          }),
        () => this.isModalVisible = false
      )
    },
    completeRental: function (id) {
      const rental = this.list.find(r => r._id.toString() === id)
      if (!rental.timeRentedOut || rental.timeReturned) {
        return this.showModal('Rental-finishing Denied', 'You cannot finish a rental not started or already finished.')
      }

      this.showModal(
        'Finish Rental',
        'Are you sure to finish this rental?',
        () => this.finishRental(id)
          .then(() => this.showModal('Rental Finished', 'You have finished this rental successfully.'))
          .catch(err => {
            this.showModal('Rental-finishing Failed', 'Please try again.')
            console.log(err)
          }),
        () => this.isModalVisible = false
      )
    },
    removeRental: function (id) {
      const rental = this.list.find(r => r._id.toString() === id)
      if (rental.timeRentedOut && !rental.timeReturned) {
        return this.showModal('Deletion Denied', 'You cannot delete a rental already started but not finished.')
      }

      this.showModal(
        'Delete Rental',
        'Are you sure to delete this rental?',
        () => this.deleteRental(id)
          .then(() => this.showModal('Rental Deleted', 'You have deleted this rental successfully.'))
          .catch(err => {
            this.showModal('Deletion Failed', 'Please try again.')
            console.log(err)
          }),
        () => this.isModalVisible = false
      )
    },
    removeUser: function (id) {
      this.showModal(
        'Delete User',
        'Are you sure to delete this user?',
        () => this.deleteUser(id)
          .then(() => this.showModal('User Deleted', 'You have deleted this user successfully.'))
          .catch(err => {
            this.showModal('Deletion failed', 'Please try again.')
            console.log(err)
          }),
        () => this.isModalVisible = false
      )
    }
  }
}
</script>

<style scoped>
.item-box::before {
	border-top: 50px solid #376FB2;
  border-bottom: 50px solid transparent;
	border-left: 1008px solid #376FB2;
	border-right: 432px solid #00A9E0;
}

.card-container {
  display: flex;
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
}

.table {
  margin: 0 auto;
}

.user-panel-button {
  width: 200px;
}

@media screen and (max-width: 1440px) {
  .item-box::before {
    border-left-width: 70vw;
    border-right-width: 30vw;
  }
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