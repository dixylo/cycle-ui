<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
        }
        throw err;
      })
    })
  }
}
</script>


<style>
html, body {
  margin: 0;
  padding: 0;
}

body {
  text-align: center;
  color: #2c3e50;
  font: 20px 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  min-height: 100vh;
  margin-top: 3.7rem;
}

.card-container {
  position: relative;
  margin: 0 auto;
  width: 1024px;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.loading {
  width: 30px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media screen and (max-width: 1024px) {
  .card-container {
    width: calc(100% - 100px);
  }
}
</style>
