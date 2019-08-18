<template>
  <div class='container home'>
    <Carousel :slides='slides' />
    <div id='tab-container'>
      <button id='brands' class='tab' @click="switchContent">Brands</button>
      <button id='types' class='tab' @click="switchContent">Types</button>
    </div>
    <div class='card-container'>
      <div v-if='!items.length'>
        <div v-if='loading'>
          <img class='loading' alt='Loading...' src='@/assets/loading.png' />
        </div>
        <div v-if='error'>
          Something failed. Please try again.
          <button class='' @click='reload'>Reload Page</button>
        </div>
      </div>
      <div v-else>
        <div v-for='item in items' :key='item._id'>
          <Card :data='item' :field='getField()' />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Carousel from '@/components/Carousel'
import Card from '@/components/Card.vue'

export default {
  name: 'home',
  components: { Carousel, Card },
  created () {
    this.fetchAllBrands()
    this.fetchAllTypes()
  },
  data () {
    return {
      areBrandsShown: false,
      slides: [
        {
          id: 1,
          name: 'Slide_01',
          url: 'slide1.jpg'
        },
        {
          id: 2,
          name: 'Slide_02',
          url: 'slide2.jpg'
        },
        {
          id: 3,
          name: 'Slide_03',
          url: 'slide3.jpg'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['getBrands', 'getTypes', 'brandStatus', 'typeStatus']),
    items: function () {
      const items = this.areBrandsShown ? this.getBrands : this.getTypes
      return items
    },
    loading: function () {
      const status = this.areBrandsShown ? this.brandStatus : this.typeStatus
      return status === 'loading'
    },
    error: function () {
      const status = this.areBrandsShown ? this.brandStatus : this.typeStatus
      return status === 'error'
    }
  },
  methods: {
    ...mapActions(['fetchAllBrands', 'fetchAllTypes']),
    switchContent (e) {
      this.areBrandsShown = e.currentTarget.id === 'brands'
    },
    getField () {
      return this.areBrandsShown ? 'brand' : 'type'
    },
    reload () {
      this.fetchAllBrands()
      this.fetchAllTypes()
    }
  }
}
</script>

<style scoped>
.home {
  margin: 0px auto;
  padding-top: 50px;
  height: 100%;
}

#tab-container {
  margin: 0px auto;
}

/* Style the tab buttons */
.tab {
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  font-size: 20px;
  width: 20%;
}

/* Change background color of buttons on hover */
.tab:hover {
  background-color: #777;
  color: #fff;
}
</style>
