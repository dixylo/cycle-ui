<template>
  <div class='container'>
    <div v-if='!model'>
      <div v-if='loadingModel'>
        <img class='loading' alt='Loading...' src='@/assets/loading.png' />
      </div>
      <div v-if='error'>
        Something failed. Please try again.
        <button class='' @click='reload'>Reload Page</button>
      </div>
    </div>
    <div v-else id='model'>
      <div class='overview'>
        <div class='image-container'>
          <img
            :alt='model.name'
            :src='model.imgUrl'
            :style="{ width: '100%' }"
          />
        </div>
        <div class='metadata'>
          <p><span>Name:</span> {{ model.name }}</p>
          <p><span>Brand:</span> {{ model.brand.name }}</p>
          <p><span>Type:</span> {{ model.type.name }}</p>
          <p><span>Introduction:</span> {{ model.description }}</p>
        </div>
      </div>
      <div id='cycles'>
        <div v-if='model.cycles.length'>
          <h2>Cycles available in this model</h2>
          <ul v-for='cycle in model.cycles' :key='cycle._id'>
            <input
              type='radio'
              name='cycle'
              :value='cycle._id'
              v-model='selectedCycleId'
            >
            <li>
              {{ cycle.size }} | 
              {{ cycle.color }} | 
              {{ cycle.hourlyRentalRate }} | 
              {{ cycle.numberInStock }}
            </li>
          </ul>
          <input
            type='datetime-local'
            name='timeToCollect'
            v-model='timeToCollect'
          >
          <button @click='handleSubmit'>
            <div v-if='loadingRental'>
              <img class='loading' alt='Loading...' src='@/assets/loading.png'/>
            </div>
            <div v-else>Place an Order</div>
          </button>
        </div>
        <div v-else>
          <h2>Oops! We haven't got any cycles of this model yet.</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'model',
  data () {
    return {
      selectedCycleId: '',
      timeToCollect: ''
    }
  },
  computed: {
    ...mapGetters(['getModels', 'getTheModel', 'modelStatus', 'rentalStatus', 'getCurrentUser', 'isLoggedIn']),
    model: function () {
      const id = this.$route.params.id
      if (this.getModels.length) {
        const model = this.getModels.find(m => m._id.toString() === id)
        return model
      }
      if (!this.getTheModel || this.getTheModel._id.toString() !== id) {
        this.fetchModelById(id)
      }
      return this.getTheModel
    },
    loadingModel: function () {
      return this.modelStatus === 'loading'
    },
    loadingRental: function () {
      return this.rentalStatus === 'loading'
    },
    error: function () {
      return this.modelStatus === 'error'
    }
  },
  methods: {
    ...mapActions(['fetchAllModels', 'fetchModelById', 'createRental']),
    handleSubmit () {
      const isLoggedIn = this.isLoggedIn
      if (!isLoggedIn) {
        alert('Please log in to proceed.')
        return this.$router.push('/login')
      }

      const currentUser = this.getCurrentUser
      this.createRental({
        cycleId: this.selectedCycleId,
        userId: currentUser._id,
        timeToCollect: this.timeToCollect
      }).then(() =>{
        alert('You have created a new rental successfully.')
      }).catch(err => {
        console.log(err)
        alert('Order failed. Please try again.')
      })
    },
    reload () {
      this.fetchModelById(this.$route.params.id)
    }
  }
}
</script>

<style scoped>
#model {
  margin: 0 auto;
  width: 1024px;
  overflow: auto;
}

@media screen and (max-width: 1024px) {
  #model {
    width: calc(100% - 100px);
  }
}
</style>
