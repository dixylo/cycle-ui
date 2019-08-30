<template>
  <div class='container'>
    <div v-if='!brand'>
      <div v-if='loading'>
        <img class='loading' alt='Loading...' src='@/assets/loading.png' />
      </div>
      <div v-if='error'>
        Something failed. Please try again.
        <button class='' @click='reload'>Reload Page</button>
      </div>
    </div>
    <div v-else>
      <div class='data'>
        <div class='hero'></div>
        <div class='overview'>
          <div class='image-container'>
            <img
              :alt='brand.name'
              :src='brand.imgUrl'
            />
          </div>
          <div class='metadata'>
            <p><span>Brand Name:</span> {{ brand.name }}</p>
            <p><span>Country:</span> {{ brand.country }}</p>
            <p><span>Phone:</span> {{ brand.phone }}</p>
            <p><span>Homepage:</span> {{ brand.homepage }}</p>
          </div>
        </div>
        <div class='introduction'>
          <p><span>Introduction:</span> {{ brand.description }}</p>
        </div>
      </div>
      <div class='model-box'>
        <p class='box-title'>Models</p>
        <div class='card-container' v-if='brand.models.length'>
          <div v-for='model in brand.models' :key='model._id'>
            <Card :data='model' field='model' />
          </div>
        </div>
        <div v-else>
          <h2>Oops! We haven't got any models of this brand yet.</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Card from '@/components/Card.vue'

export default {
  name: 'brand',
  components: { Card },
  computed: {
    ...mapGetters(['getBrands', 'getTheBrand', 'brandStatus']),
    brand: function () {
      const id = this.$route.params.id
      if (this.getBrands.length) {
        const brand = this.getBrands.find(b => b._id.toString() === id)
        return brand
      }
      if (!this.getTheBrand || this.getTheBrand._id.toString() !== id) {
        this.fetchBrandById(id)
      }
      return this.getTheBrand
    },
    loading: function () {
      return this.brandStatus === 'loading'
    },
    error: function () {
      return this.brandStatus === 'error'
    }
  },
  methods: {
    ...mapActions(['fetchBrandById']),
    reload () {
      this.fetchBrandById(this.$route.params.id)
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
  background-image: url('../assets/hero_brand.webp');
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
  width: 400px;
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
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
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
	border-top: 50px solid #376FB2;
  border-bottom: 50px solid transparent;
	border-left: 70vw solid #376FB2;
	border-right: 30vw solid #00b200;
}

.card-container {
  background-color: azure;
  padding: 100px;
}
</style>
