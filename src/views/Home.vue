<template>
  <div class='container'>
    <div id='carousel'>
      <Carousel :slides='slides' />
    </div>
    <div id='placeholder'></div>
    <div id='brand-box' class='item-box'>
      <p class='box-title'>Find Your Favourite Brand</p>
      <div class='item-list'>
        <div v-if='!brands.length'>
          <div v-if='loadingBrands'>
            <img class='loading' alt='Loading...' src='@/assets/loading.png' />
          </div>
          <div v-if='error'>
            Something failed. Please try again.
            <button class='' @click='reload'>Reload Page</button>
          </div>
        </div>
        <div class='items' v-else>
          <div v-for='brand in brands' :key='brand._id'>
            <Card :data='brand' field='brand' />
          </div>
        </div>
      </div>
    </div>
    <div class='image-section'>
      <div id='middle-image' class='image-box'></div>
      <div class='image-text'>
        <p id='mp1'>Crazy about bikes,<br>but balking at the price?</p>
        <p id='mp2'>
          Congrats! You are visiting the right place, where you can try the most popular models of world famous brands at an incredably low rate.
        </p>
        <p id='mp3'>Check out our story and come visit us</p>
        <div id='link-box'>
          <router-link class='link' to='/about'>About Us</router-link>
          <router-link class='link' to='/contact'>Contact Us</router-link>
        </div>
      </div>
    </div>
    <div id='type-box' class='item-box'>
      <p class='box-title'>Choose a Type You Need</p>
      <div class='item-list'>
        <div v-if='!types.length'>
          <div v-if='loadingTypes'>
            <img class='loading' alt='Loading...' src='@/assets/loading.png' />
          </div>
          <div v-if='error'>
            Something failed. Please try again.
            <button class='' @click='reload'>Reload Page</button>
          </div>
        </div>
        <div class='items' v-else>
          <div v-for='type in types' :key='type._id'>
            <Card :data='type' field='type' />
          </div>
        </div>
      </div>
    </div>
    <div class='image-section'>
      <div id='bottom-image' class='image-box'></div>
      <div class='image-text'>
        <p id='bp1'>"Nothing compares to the simple pleasure of a bike ride."</p>
        <p id='bp2'>—— John F. Kennedy</p>
        <p id='bp3'>Rent a bike and start your journey now</p>
        <div id='link-box'>
          <router-link class='link' to='/login'>Log in</router-link>
          <router-link class='link' to='/signup'>Sign up</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Carousel from '@/components/Carousel'
import Card from '@/components/Card.vue'

export default {
  name: 'home',
  components: { Carousel, Card },
  created () {
    this.fetchAllBrands()
    this.fetchAllTypes()
  },
  data () {
    return {
      slides: [
        {
          id: 1,
          name: 'Slide_01',
          url: 'brands.webp'
        },
        {
          id: 2,
          name: 'Slide_02',
          url: 'types.webp'
        },
        {
          id: 3,
          name: 'Slide_03',
          url: 'models.webp'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['getBrands', 'getTypes', 'brandStatus', 'typeStatus']),
    brands: function () {
      return this.getBrands
    },
    types: function () {
      return this.getTypes
    },
    loadingBrands: function () {
      return this.brandStatus === 'loading'
    },
    loadingTypes: function () {
      return this.typeStatus === 'loading'
    },
    error: function () {
      return this.brandStatus === 'error'
    },
    error: function () {
      return this.typeStatus === 'error'
    }
  },
  methods: {
    ...mapActions(['fetchAllBrands', 'fetchAllTypes']),
    reload () {
      this.fetchAllBrands()
      this.fetchAllTypes()
    }
  }
}
</script>

<style scoped>
#carousel {
  position: fixed;
  top: 3.8rem;
  left: 0;
  right: 0;
}

#placeholder {
  position: relative;
  display: block;
  width: 100%;
  padding-top: 45%;
  z-index: -1;
}

.image-section {
  position: relative;
  z-index: 1;
}

.image-box {
  height: 700px;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  z-index: 1;
  filter: blur(3px) brightness(70%);
  transform: scale(1.01);
}

#middle-image {
  background-image: url('../assets/downhill.jpg');
}

#bottom-image {
  background-image: url('../assets/bikeshop.jpg');
}

.image-text {
  margin: 0 auto;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 900px;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}

.image-text p {
  margin: 0;
  padding: .5em 0;
  color: #fff;
  font-size: 50px;
  text-shadow: 2px 2px 4px #000000;
}

#mp1 {
  font-weight: 600;
}

#mp2 {
  font-size: 40px;
}

#mp3 {
  font-weight: bold;
}

#bp1 {
  font-style: italic;
  font-weight: 600;
}

#bp2 {
  font-size: 30px;
  font-weight: bold;
}

#bp3 {
  font-weight: bold;
}

#link-box {
  display: flex;
  justify-content: center;
}

.link {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #dbdbdb;
  font-size: 25px;
  font-weight: bold;
  padding: 1em 3em;
  background: transparent;
  border: 4px solid rgba(219, 219, 219, 1);
  border-radius: 2em;
  margin: 0 3em;
  text-decoration: none;
  transition: all 0.2s;
}

.link:hover {
  color: gray;
  background: rgba(219, 219, 219, 1);
}

.item-box {
  position: relative;
  z-index: 1;
  background: white;
  padding: 6rem 0;
}

.item-box::before {
  content: '';
	width: 0;
	height: 0;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
}

.item-box::after {
  content: '';
	width: 0;
	height: 0;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
}

#brand-box::before {
	border-top: 50px solid #376FB2;
  border-bottom: 50px solid transparent;
	border-left: 70vw solid #376FB2;
	border-right: 30vw solid #00A9E0;
  top: -5px;
}

#brand-box::after {
	border-top: 50px solid transparent;
  border-bottom: 50px solid #376FB2;
	border-left: 30vw solid #376FB2;
	border-right: 70vw solid #00A9E0;
  bottom: 0;
}

#type-box::before {
	border-top: 50px solid #008000;
  border-bottom: 50px solid transparent;
	border-left: 30vw solid #33cc33;
	border-right: 70vw solid #008000;
  top: 0;
}

#type-box::after {
	border-top: 50px solid transparent;
  border-bottom: 50px solid #008000;
	border-left: 70vw solid #008000;
	border-right: 30vw solid #33cc33;
  bottom: 0;
}

.box-title {
  color: #003C71;
  font-size: 50px;
  font-style: italic;
  font-weight: bold;
  margin: 0;
  padding-bottom: 2em;
  position: relative;
}

.box-title::after {
  content: '__';
  color: #00A9E0;
  display: block;
  font-size: 100px;
  font-style: normal;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.item-list {
  position: relative;
  max-width: 1920px;
  z-index: 1;
  background-color: azure;
}

.items {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
