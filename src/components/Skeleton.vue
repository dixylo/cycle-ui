<template>
  <div class='card-container-background'>
    <div class='card-container' v-if="status === 'loading'">
      <div class='card' v-for='n in 12' :key='n'>
        <div class='image'>
          <img class='loading' alt='Loading...' src='@/assets/loading.png' />
        </div>
        <p class='caption-one'></p>
        <p class='caption-two'></p>
      </div>
    </div>
    <div class='error' v-else-if="status === 'error'">
      <span>Something failed. Please try again.</span>
      <button class='user-panel-button' @click='handleReload'>Reload Page</button>
    </div>
    <div class='error' v-else>
      <span>There's no data to show.</span>
      <router-link class='link' to='/'>Back to Homepage</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Skeleton',
  props: ['status', 'onReload'],
  methods: {
    handleReload () {
      if (this.onReload) this.onReload()
    }
  }
}
</script>

<style scoped>
.card {
  width: 300px;
  margin: 10px 20px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}

.image {
  position: relative;
  height: 300px;
  background-color: #e3e3e3;
}

.caption-one {
  width: 80%;
  height: 20px;
  margin-left: 20px;
  background-color: #e3e3e3;
}

.caption-two {
  width: 60%;
  height: 20px;
  margin-left: 20px;
  background-color: #e3e3e3;
}

.error {
  margin: 0 auto;
  padding: 100px;
  max-width: 500px;
  background-color: azure;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.error span {
  color: #003c71;
  font-size: 30px;
}

.user-panel-button {
  width: 200px;
}

.link {
  width: 60%;
  height: 40px;
  margin: 20px auto;
  padding: 0;
  border-color: #003c71;
  border-radius: 5px;
  background-color: #003c71;
  font-size: 20px;
  font-weight: normal;
}

.link:hover {
  color: #fff;
  border-color: #376FB2;
  background-color: #376FB2;
}

.loading {
  position: absolute;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
  width: 50px;
}
</style>
