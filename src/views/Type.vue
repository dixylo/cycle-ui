<template>
  <div class='container'>
    <div v-if='!type'>
      <Skeleton
        :status='typeStatus'
        :onReload='() => this.fetchTypeById(this.$route.params.id)'
      />
    </div>
    <div v-else>
      <div class='data'>
        <div class='hero'></div>
        <div class='overview'>
          <div class='image-container'>
            <img
              :alt='type.name'
              :src='type.imgUrl'
            />
          </div>
          <div class='metadata'>
            <p><span>Type Name:</span> {{ type.name }}</p>
            <p><span>Introduction:</span> {{ type.description }}</p>
          </div>
        </div>
      </div>
      <div class='model-box'>
        <p class='box-title'>Models</p>
        <div class='card-container' v-if='type.models.length'>
          <div v-for='model in type.models' :key='model._id'>
            <Card :data='model' field='model' />
          </div>
        </div>
        <div class='no-cards' v-else>
          <h2>Oops! We haven't got any models of this type yet.</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Card from '@/components/Card'
import Skeleton from '@/components/Skeleton'

export default {
  name: 'type',
  components: { Card, Skeleton },
  computed: {
    ...mapGetters(['getTypes', 'getTheType', 'typeStatus']),
    type: function () {
      const id = this.$route.params.id
      if (this.getTypes.length) {
        const type = this.getTypes.find(t => t._id.toString() === id)
        return type
      }
      if (!this.getTheType || this.getTheType._id.toString() !== id) {
        this.fetchTypeById(id)
      }
      return this.getTheType
    }
  },
  methods: mapActions(['fetchTypeById'])
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
  background-image: url('../assets/hero_type.webp');
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
  padding: 50px;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  position: relative;
  z-index: 1;
}

.image-container {
  width: 600px;
  flex: 1;
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
  flex: 1;
  padding: 2em;
}

.metadata span {
  font-size: 20px;
  margin-right: 1em;
}

.metadata p {
  font-size: 30px;
  margin: .5em;
  text-align: justify;
}

.model-box {
  padding: 80px;
}

.box-title {
  color: #003C71;
  font-size: 50px;
  font-style: italic;
  font-weight: bold;
  margin: 0;
  position: relative;
}

.box-title::after {
  content: '__';
  color: #00A9E0;
  display: block;
  font-size: 100px;
  font-style: normal;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.model-box {
  position: relative;
}

.model-box::before {
  content: '';
	width: 0;
	height: 0;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
	border-top: 50px solid #008000;
  border-bottom: 50px solid transparent;
	border-left: 30vw solid #00A9E0;
	border-right: 70vw solid #008000;
}

.card-container {
  background-color: azure;
  padding: 100px;
}

.no-cards {
  padding: 3em;
}
</style>
