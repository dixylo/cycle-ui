<template>
  <div id='brand'>
    <div class='overview'>
      <div class='image-container'>
        <img
          alt='Brand Name'
          src='@/assets/logo.png'
          :style="{ width: '100%' }"
        />
      </div>
      <div class='metadata'>
        <p><span>Name:</span> {Brand.name}</p>
        <p><span>Director:</span> {Brand.directors}</p>
        <p><span>Writers:</span> {Brand.writers}</p>
        <p><span>Stars:</span> {Brand.stars}</p>
        <p><span>Category:</span> {Brand.category}</p>
      </div>
    </div>
    <div class='card-container'>
      <h2>Types</h2>
      <div v-for='type in types' :key='type.id'>
        <Card :data='type' :fieldId='{ brandId, typeId: type.id }' />
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'

export default {
  name: 'brand',
  components: {
    Card
  },
  created() {
    this.brandId = parseInt(this.$route.params.brandId)
  },
  data() {
    return {
      brandId: 0,
      types: [
        {
          id: 1,
          name: 'Race',
          category: 'Giant'
        },
        {
          id: 2,
          name: 'Utility',
          category: 'Phoenix'
        },
        {
          id: 3,
          name: 'Mountain',
          category: 'Permanent'
        },
        {
          id: 4,
          name: 'Kid',
          category: 'Sphinx'
        }
      ]
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
