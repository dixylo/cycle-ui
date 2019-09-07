<template>
  <div id='wrapper'>
    <div id='items' v-if="status === 'loading'">
      <div id='card' v-for='n in 12' :key='n'>
        <div id='image'>
          <img class='loading' alt='Loading...' src='@/assets/loading.png' />
        </div>
        <p id='caption-one'></p>
        <p id='caption-two'></p>
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
#wrapper {
  background-color: azure;
}

#items {
  margin: 0 auto;
  padding: 100px;
  max-width: 1024px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

#card {
  width: 300px;
  margin: 10px 20px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  background-color: white;
}

#image {
  position: relative;
  height: 300px;
  background-color: #e3e3e3;
}

#caption-one {
  width: 80%;
  height: 20px;
  margin-left: 20px;
  background-color: #e3e3e3;
}

#caption-two {
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

.link {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 20px;
  /* font-weight: bold; */
  width: 60%;
  height: 40px;
  /* padding: 0 .75em; */
  background-color: #003c71;
  border: 2px solid #003c71;
  border-radius: 5px;
  margin: 20px auto;
  text-decoration: none;
  transition: all 0.2s;
}

.link:hover {
  background-color: #376FB2;
  border-color: #376FB2;
}

.user-panel-button {
  width: 60%;
  height: 40px;
  margin: 20px auto;
  border-radius: 5px;
  font-size: 20px;
  color: #FFF;
  background-color: #003c71;
  border-color: #003c71;

  cursor: pointer;
}

.user-panel-button:hover {
  background-color: #376FB2;
  border-color: #376FB2;
}

.user-panel-button:focus {
  outline: none;
}

.loading {
  position: absolute;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
  width: 50px;
}
</style>
