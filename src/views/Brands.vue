<template>
  <div class='card-container'>
    <h2>All Brands</h2>
    <div v-for='brand in brands' :key='brand.id'>
      <Card :data='brand' :fieldId='{ brandId: brand.id }' />
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'

export default {
  name: 'brands',
  components: {
    Card
  },
  data() {
    return {
      brands: [
        {
          id: 1,
          name: 'Giant',
          category: 'Race'
        },
        {
          id: 2,
          name: 'Phoenix',
          category: 'Utility'
        },
        {
          id: 3,
          name: 'Permanent',
          category: 'Mountain'
        },
        {
          id: 4,
          name: 'Sphinx',
          category: 'Kid'
        }
      ]
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
