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

.item-box {
  position: relative;
  padding: 3rem 0;
  /* width: 100%; */
  background-color: #FFF;
}

.item-box::before {
  content: '';
	width: 0;
	height: 0;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.item-box::after {
  content: '';
  width: 100vw;
	height: 100px;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 0;
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
  bottom: -10%;
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

.link {
  width: 100px;
  margin: auto;
  padding: .75em;
  border: 2px solid #FFF;
  border-radius: 2em;
  background-color: transparent;
  color: #FFF;
  font-size: 15px;
  font-weight: bold;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
}

.link:hover {
  color: #003c71;
  background-color: #FFF;
}

.loading {
  width: 30px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Brands, Types, About, Contact Pages Start */
.hero-section {
  width: 100%;
  padding-top: 44.8%;
  position: relative;
}

.hero-image-box {
  position: fixed;
  top: 3.71rem;
  left: 0;
  right: 0;
}

.hero-image-box img {
  width: 100%;
}
/* Brands, Types, About, Contact Pages End */

/* Brand, Type, Model Pages Start */
.data {
  color: #FFF;
  padding: 50px;
  position: relative;
  text-shadow: 2px 2px 4px #000000;
}

.hero {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.hero::before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
	background-color: #000;
  opacity: .6;
}

.overview {
  max-width: 1024px;
  margin: 0 auto;
  padding: 50px 0;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  position: relative;
  z-index: 1;
}

.image-container {
  width: 500px;
}

.image-container img {
  width: 100%;
  border: 5px solid #AAA;
  border-style: outset;
}

.metadata {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.metadata span {
  font-size: 20px;
  margin-right: 1em;
}

.metadata p {
  font-size: 30px;
  margin: .5em;
  text-align: left;
}

.introduction {
  position: relative;
  z-index: 1;
}

.introduction span {
  font-size: 15px;
  margin-right: 1em;
}

.introduction p {
  margin: 0 auto;
  max-width: 1024px;
  text-align: justify;
}

.no-cards {
  padding: 3em;
}
/* Brand, Type, Model Pages End */

/* User Page Starts */
.user {
  box-sizing: border-box;
  padding: 50px;
  background-image: url('./assets/login.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
}

.user-panel {
  max-width: 1024px;
  margin: auto;
  display: flex;
  justify-content: center;
  opacity: .9;
}

.welcome-section {
  width: 40%;
  padding: 40px;
  color: #FFF;
  background-color: #003c71;
  border-radius: 30px 0 0 30px;
}

.p-one {
  font-size: 30px;
}

.p-two {
  font-size: 20px;
}

.p-three {
  width: 15em;
  margin: 1em auto;
  font-size: 15px;
}

.user-hr {
  width: 50%;
  color: #FFF;
  border-style: double;
}

.form-section {
  width: 60%;
  color: #003C71;
  background-color: #FFF;
  border-radius: 0 30px 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-title {
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  margin: 1em auto;
  position: relative;
}

.form-title::after {
  content: '__';
  color: #00A9E0;
  display: block;
  font-size: 50px;
  font-style: normal;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.user-panel-div {
  margin: 0 auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.user-panel-input {
  height: 1em;
  font-size: 20px;
  margin: .5em;
  border: none;
  color: #003C71;
  border-bottom: 2px solid #003C71;
  background-color: transparent;
  outline: none;
}

.user-panel-button {
  width: 60%;
  height: 40px;
  margin: 20px auto;
  border-radius: 5px;
  font-size: 20px;
  color: #FFF;
  background-color: #003C71;
  border-color: #003C71;
  transition: .3s;
}

.user-panel-button:hover {
  background-color: #376FB2;
  border-color: #376FB2;
}
/* User Page Ends */
</style>
