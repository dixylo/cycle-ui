<template>
  <div id='type'>
    <div class='overview'>
      <div class='image-container'>
        <img
          alt='Type Name'
          src='@/assets/logo.png'
          :style="{ width: '100%' }"
        />
      </div>
      <div class='metadata'>
        <p><span>Name:</span> {Type.name}</p>
        <p><span>Director:</span> {Type.directors}</p>
        <p><span>Writers:</span> {Type.writers}</p>
        <p><span>Stars:</span> {Type.stars}</p>
        <p><span>Category:</span> {Type.category}</p>
      </div>
    </div>
    <div class='card-container'>
      <h2>Brands</h2>
      <div v-for='brand in brands' :key='brand.id'>
        <Card :data='brand' :fieldId='{ brandId: brand.id, typeId }' />
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'

export default {
  name: 'type',
  components: {
    Card
  },
  created() {
    this.typeId = parseInt(this.$route.params.typeId)
  },
  data() {
    return {
      typeId: 0,
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
#type {
  margin: 0 auto;
  width: 1024px;
  overflow: auto;
}

@media screen and (max-width: 1024px) {
  #type {
    width: calc(100% - 100px);
  }
}
</style>
