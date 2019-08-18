<template>
  <div class='container'>
    <div v-if='!type'>
      <div v-if='loading'>
        <img class='loading' alt='Loading...' src='@/assets/loading.png' />
      </div>
      <div v-if='error'>
        Something failed. Please try again.
        <button class='' @click='reload'>Reload Page</button>
      </div>
    </div>
    <div v-else id='type'>
      <div class='overview'>
        <div class='image-container'>
          <img
            :alt='type.name'
            :src='type.imgUrl'
            :style="{ width: '100%' }"
          />
        </div>
        <div class='metadata'>
          <p><span>Name:</span> {{ type.name }}</p>
          <p><span>Introduction:</span> {{ type.description }}</p>
        </div>
      </div>
      <div class='card-container'>
        <div v-if='type.models.length'>
          <h2>Models</h2>
          <div v-for='model in type.models' :key='model._id'>
            <Card :data='model' field='model' />
          </div>
        </div>
        <div v-else>
          <h2>Oops! We haven't got any models of this type yet.</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Card from '@/components/Card.vue'

export default {
  name: 'type',
  components: { Card },
  computed: {
    ...mapGetters(['getTypes', 'getTheType', 'typeStatus']),
    type: function () {
      const id = this.$route.params.id
      if (this.getTypes.length) {
        const type = this.getTypes.find(t => t._id.toString() === id)
        return type
      }
      if (!this.getTheType || this.getTheType._id.toString() !== id) {
        this.fetchTypeById(id)
      }
      return this.getTheType
    },
    loading: function () {
      return this.typeStatus === 'loading'
    },
    error: function () {
      return this.typeStatus === 'error'
    }
  },
  methods: {
    ...mapActions(['fetchTypeById']),
    reload () {
      this.fetchTypeById(this.$route.params.id)
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
