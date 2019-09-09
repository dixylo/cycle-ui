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
  width: 100%;
  overflow: hidden;
  min-height: 100vh;
  margin-top: 3.7rem;
}

.page-title {
  color: #FFF;
  font-size: 60px;
  font-weight: bold;
  text-align: left;
  text-shadow: 2px 2px 4px #000000;
  position: absolute;
  left: 1em;
  right: 1em;
  bottom: .5em;
  border-bottom: 3px solid #FFF;
}

.box-title {
  position: relative;
  margin: 0 auto;
  padding: .75em 0;
  color: #003C71;
  font-size: 50px;
  font-style: italic;
  font-weight: bold;
}

.box-title::after {
  content: '__';
  color: #00A9E0;
  display: block;
  font-size: 100px;
  font-style: normal;
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
}

.card-container {
  position: relative;
  margin: 0 auto;
  max-width: 1024px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.card-container-background {
  padding: 40px 0;
  background-color: azure;
}

.loading {
  width: 30px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
