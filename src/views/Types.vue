<template>
  <div class='container'>
    <div class='hero'>
      <div class='image-box'>
        <img alt='All Types' src='@/assets/hero_types.webp' />
      </div>
      <p class='box-title'>Wide Variety of Types</p>
    </div>
    <div class='item-box'>
      <p class='preface'>
        Where there are roads, there'll be adventurous cycling souls. Let us equip you to conquer the unconquered terrain.
      </p>
      <div v-if='!types.length'>
        <div v-if='loading'>
          <img class='loading' alt='Loading...' src='@/assets/loading.png' />
        </div>
        <div v-if='error'>
          Something failed. Please try again.
          <button class='' @click='reload'>Reload Page</button>
        </div>
      </div>
      <div class='items' v-else>
        <div v-for='type in types' :key='type._id'>
          <Card :data='type' field='type' />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Card from '@/components/Card.vue'

export default {
  name: 'types',
  components: { Card },
  created () {
    if (!this.types.length) this.fetchAllTypes()
  },
  computed: {
    ...mapGetters(['getTypes', 'typeStatus']),
    types: function () {
      return this.getTypes
    },
    loading: function () {
      return this.typeStatus === 'loading'
    },
    error: function () {
      return this.typeStatus === 'error'
    }
  },
  methods: {
    ...mapActions(['fetchAllTypes']),
    reload () {
      this.fetchAllTypes()
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
  text-align: right;
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
	border-top: 50px solid #007f26;
  border-bottom: 100px solid transparent;
	border-left: 30vw solid #00b235;
	border-right: 70vw solid #00992d;
  z-index: 1;
}

.preface {
  position: relative;
  color: #003C71;
  font-size: 40px;
  font-weight: 400;
  margin: 0 auto;
  padding: 150px 0 0;
  max-width: 28em;
}

.preface::before {
  content: '';
	height: 100px;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: #00A9E0;
  z-index:0;
}

.preface::after {
  content: '__';
  color: #00A9E0;
  display: block;
  font-size: 100px;
  font-style: normal;
  position: absolute;
  left: 50%;
  bottom: -25%;
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
