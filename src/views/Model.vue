<template>
  <div class='container'>
    <div v-if='!model'>
      <Skeleton
        :status='modelStatus'
        :onReload='() => this.fetchModelById(this.$route.params.id)'
      />
    </div>
    <div v-else>
      <div class='data'>
        <div class='hero'></div>
        <div class='overview'>
          <div class='image-container'>
            <img
              :alt='model.name'
              :src='model.imgUrl'
            />
          </div>
          <div class='metadata'>
            <p><span>Model Name:</span> {{ model.name }}</p>
            <p><span>Brand Name:</span> {{ model.brand.name }}</p>
            <p><span>Type Name:</span> {{ model.type.name }}</p>
          </div>
        </div>
        <div class='introduction'>
          <p><span>Introduction:</span> {{ model.description }}</p>
        </div>
      </div>
      <div class='item-box'>
        <p class='box-title'>Cycles</p>
        <div class='no-cards' v-if='!model.cycles.length'>
          <h2>Oops! We haven't got any cycles of this model yet.</h2>
        </div>
        <div class='card-container' v-else>
          <form
            class='user-panel-div'
            @submit.prevent='handleSubmit'
          >
            <label for='cycle'>
              Please select a cycle.
            </label>
            <table>
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Size</th>
                  <th>Color</th>
                  <th>Rate ($/hr)</th>
                  <th>In Stock</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for='cycle in model.cycles' :key='cycle._id'>
                  <td>
                    <input
                      type='radio'
                      name='cycle'
                      :value='cycle._id'
                      v-model='selectedCycleId'
                    >
                  </td>
                  <td>{{ cycle.size }}</td>
                  <td>{{ cycle.color }}</td>
                  <td>{{ cycle.hourlyRentalRate }}</td>
                  <td>{{ cycle.numberInStock }}</td>
                </tr>
              </tbody>
            </table>
            <hr>
            <label for='timeToCollect'>
              Please select a date and time<br>to pick up your rental.
            </label>
            <input
              id='datepicker'
              type='datetime-local'
              name='timeToCollect'
              v-model='timeToCollect'
              required
            >
            <Button
              class='submit'
              type='submit'
              :status='rentalStatus'
            >
              <div v-if='loadingRental'>
                <img class='loading' alt='Loading...' src='@/assets/loading.png'/>
              </div>
              <div v-else>Place an Order</div>
            </Button>
          </form>
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
  name: 'model',
  components: { Skeleton, Button },
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
    }
  },
  methods: {
    ...mapActions(['fetchModelById', 'createRental']),
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
    }
  }
}
</script>

<style scoped>
.data {
  color: #FFF;
  padding: 50px;
  position: relative;
  text-shadow: 2px 2px 4px #000000;
}

.hero {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  background-image: url('../assets/hero_model.webp');
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.hero::before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
	background-color: #000;
  opacity: .6;
}

.overview {
  max-width: 1024px;
  margin: 0 auto;
  padding: 50px 0;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  position: relative;
  z-index: 1;
}

.image-container {
  width: 500px;
}

.image-container img {
  width: 100%;
  border: 5px solid #AAA;
  border-style: outset;
}

.metadata {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.metadata span {
  font-size: 20px;
  margin-right: 1em;
}

.metadata p {
  font-size: 30px;
  margin: .5em;
  text-align: left;
}

.introduction {
  position: relative;
  z-index: 1;
}

.introduction span {
  font-size: 15px;
  margin-right: 1em;
}

.introduction p {
  margin: 0 auto;
  max-width: 1024px;
  text-align: justify;
}

.item-box {
  position: relative;
  padding: 6rem 0 3rem;
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
	border-top: 50px solid #007f26;
  border-bottom: 100px solid transparent;
	border-left: 60vw solid #0076b2;
	border-right: 40vw solid #00992d;
  z-index: 1;
}

.item-box::after {
  content: '';
  width: 100vw;
	height: 100px;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: #00A9E0;
  z-index: 0;
}

.box-title::after {
  bottom: -10%;
}

.card-container {
  padding: 40px 0;
  background-color: azure;
}

table {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  margin: 1.5em auto;
  background-color: white;
}

tr:nth-child(even){
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}

th, td {
  border: 1px solid #ddd;
  padding: .4em;
}

th {
  padding: .6em .4em;
  /* padding-bottom: 12px; */
  background-color: #4CAF50;
  color: white;
}

hr {
  width: 50%;
  margin: 30px auto;
  border-style: double;
}

label {
  color: #003C71;
  font-size: 30px;
  font-weight: bold;
}

#datepicker {
  display: block;
  margin: 1em;
  padding: 1em;
  color: white;
  font-size: 30px;
  background-color: #0076b2;
}

::-webkit-inner-spin-button {
  width: 30px;
  height: 30px;
}

::-webkit-calendar-picker-indicator:hover {
  color: #0076b2;
}

button {
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  color: #003C71;
  padding: 1em 3em;
  border-radius: 2em;
  border-width: 3px;
  border-color: #003C71;
  background-color: transparent;
  transition: .3s;
}

button:hover {
  color: #FFF;
  background-color: #003C71;
}

.no-cards {
  padding: 3em;
}

@media screen and (max-width: 1120px) {
  .item-box {
    padding-top: 4rem
  }

  .item-box::before {
    border-top-width: 40px;
    border-bottom-width: 80px;
  }

  .item-box::after {
    height: 80px;
  }

  .image-container {
    width: 400px;
  }

  .metadata span {
    font-size: 18px;
  }

  .metadata p {
    font-size: 25px;
  }
}

@media screen and (max-width: 950px) {
  .image-container {
    width: 350px;
  }

  .metadata span {
    font-size: 15px;
  }

  .metadata p {
    font-size: 20px;
  }
}

@media screen and (max-width: 850px) {
  .overview {
    padding: 10px 0;
    flex-direction: column;
    align-items: center;
  }

  .image-container {
    width: 400px;
  }

  .metadata {
    width: 100%;
  }
  
  .metadata p {
    margin: .5em 0;
  }

  .item-box {
    padding-top: 3rem;
  }

  .item-box::before {
    border-top-width: 30px;
    border-bottom-width: 60px;
  }

  .item-box::after {
    height: 70px;
  }  
  
  .box-title {
    font-size: 40px;
  }

  .box-title::after {
    font-size: 80px;
  }
}

@media screen and (max-width: 580px) {
  .data {
    padding: 30px;
  }

  .image-container {
    width: 350px;
  }  

  .item-box::before {
    border-top-width: 25px;
    border-bottom-width: 50px;
  }

  .item-box::after {
    height: 60px;
  } 

  .box-title {
    font-size: 30px;
  }

  .box-title::after {
    font-size: 60px;
  }

  label {
    font-size: 25px;
  }

  #datepicker {
    font-size: 25px;
  }

  button {
    font-size: 18px;
  }
}

@media screen and (max-width: 540px) {
  table {
    font-size: 18px;
  }
}

@media screen and (max-width: 500px) {
  .overview {
    padding: 7.5px 0;
  }

  .image-container {
    width: 300px;
  }

  .metadata span {
    font-size: 12px;
  }

  .metadata p {
    font-size: 15px;
  }

  .introduction span {
    font-size: 12px;
  }

  .introduction p {
    font-size: 15px;
  }

  label {
    font-size: 20px;
  }

  table {
    font-size: 15px;
  }

  #datepicker {
    font-size: 20px;
  }

  button {
    font-size: 15px;
    border-width: 2px;
  }
}

@media screen and (max-width: 410px) {
  .image-container {
    width: 250px;
  }

  label {
    font-size: 18px;
  }

  table {
    font-size: 12px;
  }

  #datepicker {
    font-size: 15px;
  }  
}
</style>
