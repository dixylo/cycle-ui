<template>
  <div class='container'>
    <div v-if='!user'>
      <div v-if='loading'>
        <img class='loading' alt='Loading...' src='@/assets/loading.png' />
      </div>
      <div v-if='error'>
        Something failed. Please try again.
        <button class='' @click='reload'>Reload Page</button>
      </div>
    </div>
    <div v-else>
      <p><span>Username:</span> {{ user.username }}</p>
      <p><span>Email:</span> {{ user.email }}</p>
      <p><span>Phone:</span> {{ user.phone }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'profile',
  computed: {
    ...mapGetters(['getCurrentUser']),
    user: function () {
      return this.getCurrentUser
    }
  }
}
</script>

<style scoped>

</style>
