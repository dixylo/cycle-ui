<template>
  <div class='container'>
    <div class='hero'>
      <div class='image-box'>
        <img alt='All Brands' src='@/assets/hero_brands.webp' />
      </div>
      <p class='box-title'>World Top Brands</p>
    </div>
    <div class='item-box'>
      <p class='preface'>
        We stock the most recognized cycle brands in the world to give you the best cycling experience.
      </p>
      <div v-if='!brands.length'>
        <div v-if='loading'>
          <img class='loading' alt='Loading...' src='@/assets/loading.png' />
        </div>
        <div v-if='error'>
          Something failed. Please try again.
          <button class='' @click='reload'>Reload Page</button>
        </div>
      </div>
      <div class='items' v-else>
        <div v-for='brand in brands' :key='brand._id'>
          <Card :data='brand' field='brand' />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Card from '@/components/Card.vue'

export default {
  name: 'brands',
  components: { Card },
  created () {
    if (!this.brands.length) this.fetchAllBrands()
  },
  computed: {
    ...mapGetters(['getBrands', 'brandStatus']),
    brands: function () {
      return this.getBrands
    },
    loading: function () {
      return this.brandStatus === 'loading'
    },
    error: function () {
      return this.brandStatus === 'error'
    }
  },
  methods: {
    ...mapActions(['fetchAllBrands']),
    reload () {
      this.fetchAllBrands()
    }
  }
}
</script>

<style scoped>
.hero {
  width: 100%;
  padding-top: 45%;
  position: relative;
}

.image-box {
  position: fixed;
  top: 3.65rem;
  left: 0;
  right: 0;
}

.image-box img {
  width: 100%;
}

.box-title {
  color: #FFF;
  font-size: 60px;
  font-weight: bold;
  text-align: left;
  text-shadow: 2px 2px 4px #000000;
  position: absolute;
  left: 1em;
  right: 1em;
  bottom: .5em;
  border-bottom: 3px solid #FFF;
}

.item-box {
  width: 100%;
  position: relative;
  background-color: #FFF;
}

.item-box::before {
  content: '';
	width: 0;
	height: 0;
  display: block;
  position: absolute;
  top: -5px;
  left: 0;
  right: 0;
	border-top: 50px solid #0076b2;
  border-bottom: 100px solid transparent;
	border-left: 70vw solid #0087cc;
	border-right: 30vw solid #0098e5;
  z-index: 1;
}

.preface {
  position: relative;
  color: #003C71;
  font-size: 40px;
  font-weight: 400;
  margin: 0 auto;
  padding: 140px 0 0;
  max-width: 25em;
}

.preface::before {
  content: '';
	height: 95px;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: #33CC33;
  z-index:0;
}

.preface::after {
  content: '__';
  color: #00A9E0;
  display: block;
  font-size: 100px;
  font-style: normal;
  position: absolute;
  bottom: -25%;
  left: 50%;
  transform: translateX(-50%);
}

.items {
  margin: 0 auto;
  padding: 100px;
  max-width: 1024px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: azure;
}
</style>
