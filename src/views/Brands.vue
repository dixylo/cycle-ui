<template>
  <div class='card-container'>
    <h2>All Brands</h2>
    <div v-if='!brands.length'>
      <div v-if='loading'>
        <img class='loading' alt='Loading...' src='@/assets/loading.png' />
      </div>
      <div v-if='error'>
        Something failed. Please try again.
        <button class='' @click='reload'>Reload Page</button>
      </div>
    </div>
    <div v-else>
      <div v-for='brand in brands' :key='brand._id'>
        <Card :data='brand' field='brand' />
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
#brands {
  margin: 0 auto;
  width: 1024px;
  overflow: auto;
}

@media screen and (max-width: 1024px) {
  #brands {
    width: calc(100% - 100px);
  }
}
</style>
