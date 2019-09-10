<template>
  <div class='container'>
    <div id='carousel'>
      <Carousel :slides='slides' />
    </div>
    <div id='placeholder'></div>
    <div id='brand-box' class='item-box'>
      <p class='box-title'>Find Your Favourite Brand</p>
      <div class='card-container-background'>
        <div v-if='!brands.length'>
          <Skeleton :status='brandStatus' :onReload='fetchAllBrands' />
        </div>
        <div class='card-container' v-else>
          <div v-for='brand in brands' :key='brand._id'>
            <Card :data='brand' field='brand' />
          </div>
        </div>
      </div>
    </div>
    <div class='image-section'>
      <div id='middle-image' class='image-box'></div>
      <div class='image-text'>
        <p id='middle-p-one'>Crazy about bikes,<br>but balking at the price?</p>
        <p id='middle-p-two'>
          Congrats! You are visiting the right place, where you can try the most popular models of world famous brands at an incredably low rate.
        </p>
        <p id='middle-p-three'>Check out our story and come visit us</p>
        <div id='link-box'>
          <router-link class='link' to='/about'>About Us</router-link>
          <router-link class='link' to='/contact'>Contact Us</router-link>
        </div>
      </div>
    </div>
    <div id='type-box' class='item-box'>
      <p class='box-title'>Choose a Type You Need</p>
      <div class='card-container-background'>
        <div v-if='!types.length'>
          <Skeleton :status='typeStatus' :onReload='fetchAllTypes' />
        </div>
        <div class='card-container' v-else>
          <div v-for='type in types' :key='type._id'>
            <Card :data='type' field='type' />
          </div>
        </div>
      </div>
    </div>
    <div class='image-section'>
      <div id='bottom-image' class='image-box'></div>
      <div class='image-text'>
        <p id='bottom-p-one'>"Nothing compares to the simple pleasure of a bike ride."</p>
        <p id='bottom-p-two'>—— John F. Kennedy</p>
        <p id='bottom-p-three'>Rent a bike and start your journey now</p>
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
import Card from '@/components/Card'
import Skeleton from '@/components/Skeleton'

export default {
  name: 'home',
  components: { Carousel, Card, Skeleton },
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
    }
  },
  methods: mapActions(['fetchAllBrands', 'fetchAllTypes'])
}
</script>

<style scoped>
#carousel {
  position: fixed;
  top: 3.71rem;
  left: 0;
  right: 0;
}

#placeholder {
  position: relative;
  display: block;
  width: 100%;
  padding-top: 44.34%;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.image-text p {
  margin: 0;
  padding: .5em 0;
  color: #fff;
  font-size: 50px;
  text-shadow: 2px 2px 4px #000000;
}

#middle-p-one {
  font-weight: 600;
}

#middle-p-two {
  font-size: 40px;
}

#middle-p-three {
  font-weight: bold;
}

#bottom-p-one {
  font-style: italic;
  font-weight: 600;
}

#bottom-p-two {
  font-size: 30px;
  font-weight: bold;
}

#bottom-p-three {
  font-weight: bold;
}

#link-box {
  display: flex;
  justify-content: center;
}

.link {
  width: auto;
  margin: 0 3em;
  padding: 1em 3em;
  border-width: .16em;
  font-size: 25px;
}

.link:hover {
  color: gray;
}

.item-box {
  z-index: 1;
  padding: 4rem 0;
}

.item-box::after {
	width: 0;
	height: 0;
}

#brand-box::before {
	border-top: 50px solid #376FB2;
  border-bottom: 50px solid transparent;
	border-left: 70vw solid #376FB2;
	border-right: 30vw solid #00A9E0;
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
}

#type-box::after {
	border-top: 50px solid transparent;
  border-bottom: 50px solid #008000;
	border-left: 70vw solid #008000;
	border-right: 30vw solid #33cc33;
  bottom: 0;
}

.card-container {
  max-width: 100vw;
}

@media screen and (max-width: 900px) {
  #brand-box::before {
    border-top-width: 40px;
    border-bottom-width: 40px;
  }

  #brand-box::after {
    border-top-width: 40px;
    border-bottom-width: 40px;
  }

  #type-box::before {
    border-top-width: 40px;
    border-bottom-width: 40px;
  }

  #type-box::after {
    border-top-width: 40px;
    border-bottom-width: 40px;
  }

  .box-title {
    font-size: 40px;
  }

  .box-title::after {
    font-size: 80px;
  }

  .image-box {
    height: 600px;
  }

  #middle-p-one {
    font-size: 40px;
  }

  #middle-p-two {
    width: 640px;
    font-size: 30px;
  }

  #middle-p-three {
    font-size: 40px;
  }

  #bottom-p-one {
    width: 640px;
    font-size: 40px;
  }

  #bottom-p-two {
    font-size: 20px;
  }

  #bottom-p-three {
    font-size: 40px;
  }

  .link {
    font-size: 20px;
    padding: 1em 3em;
    border-radius: 2em;
    margin: 0 3em;
  }
}

@media screen and (max-width: 720px) {
  #brand-box::before {
    border-top-width: 30px;
    border-bottom-width: 30px;
  }

  #brand-box::after {
    border-top-width: 30px;
    border-bottom-width: 30px;
  }

  #type-box::before {
    border-top-width: 30px;
    border-bottom-width: 30px;
  }

  #type-box::after {
    border-top-width: 30px;
    border-bottom-width: 30px;
  }

  .box-title {
    font-size: 30px;
  }

  .box-title::after {
    font-size: 60px;
  }

  .image-box {
    height: 400px;
  }

  #middle-p-one {
    font-size: 30px;
  }

  #middle-p-two {
    width: 420px;
    font-size: 20px;
  }

  #middle-p-three {
    font-size: 30px;
  }

  #bottom-p-one {
    width: 500px;
    font-size: 30px;
  }

  #bottom-p-two {
    font-size: 15px;
  }

  #bottom-p-three {
    font-size: 30px;
  }

  .link {
    font-size: 15px;
  }
}

@media screen and (max-width: 540px) {
  .item-box {
    padding: 50px 0;
  }

  #brand-box::before {
    border-top-width: 20px;
    border-bottom-width: 20px;
  }

  #brand-box::after {
    border-top-width: 20px;
    border-bottom-width: 20px;
  }

  #type-box::before {
    border-top-width: 20px;
    border-bottom-width: 20px;
  }

  #type-box::after {
    border-top-width: 20px;
    border-bottom-width: 20px;
  }

  .box-title {
    font-size: 20px;
  }

  .box-title::after {
    font-size: 40px;
  }

  .image-box {
    height: 320px;
  }

  #middle-p-one {
    font-size: 20px;
  }

  #middle-p-two {
    width: 320px;
    font-size: 15px;
  }

  #middle-p-three {
    font-size: 20px;
  }

  #bottom-p-one {
    width: 350px;
    font-size: 20px;
  }

  #bottom-p-two {
    font-size: 12px;
  }

  #bottom-p-three {
    font-size: 20px;
  }

  .link {
    font-size: 12px;
  }
}

@media screen and (max-width: 410px) {
  .link {
    padding: 1em 2em;
    margin: 0 2em;
  }
}
</style>
