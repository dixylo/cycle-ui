<template>
  <div class='card-container'>
    <h2>All Types</h2>
    <div v-if='!types.length'>
      <div v-if='loading'>
        <img class='loading' alt='Loading...' src='@/assets/loading.png' />
      </div>
      <div v-if='error'>
        Something failed. Please try again.
        <button class='' @click='reload'>Reload Page</button>
      </div>
    </div>
    <div v-else>
      <div v-for='type in types' :key='type._id'>
        <Card :data='type' field='type' />
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
