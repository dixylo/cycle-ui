<template>
  <div class='card-container'>
    <h2>All Types</h2>
    <div v-for='type in types' v-bind:key='type.id'>
      <Card :data='type' :fieldId='{ typeId: type.id }' />
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'

export default {
  name: 'types',
  components: {
    Card
  },
  data() {
    return {
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
#types {
  margin: 0 auto;
  width: 1024px;
  overflow: auto;
}

@media screen and (max-width: 1024px) {
  #types {
    width: calc(100% - 100px);
  }
}
</style>
