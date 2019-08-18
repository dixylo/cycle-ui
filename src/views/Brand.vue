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
    <div v-else id='brand'>
      <div class='overview'>
        <div class='image-container'>
          <img
            :alt='brand.name'
            :src='brand.imgUrl'
            :style="{ width: '100%' }"
          />
        </div>
        <div class='metadata'>
          <p><span>Name:</span> {{ brand.name }}</p>
          <p><span>Country:</span> {{ brand.country }}</p>
          <p><span>Phone:</span> {{ brand.phone }}</p>
          <p><span>Homepage:</span> {{ brand.homepage }}</p>
          <p><span>Introduction:</span> {{ brand.description }}</p>
        </div>
      </div>
      <div class='card-container'>
        <div v-if='brand.models.length'>
          <h2>Models</h2>
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
#brand {
  margin: 0 auto;
  width: 1024px;
  overflow: auto;
}

@media screen and (max-width: 1024px) {
  #brand {
    width: calc(100% - 100px);
  }
}
</style>
