<template>
  <div class='container'>
    <div class='hero-section'>
      <div class='hero-image-box'>
        <img alt='All Brands' src='@/assets/hero_brands.webp' />
      </div>
      <p class='page-title'>World Top Brands</p>
    </div>
    <div class='item-box'>
      <p class='box-title'>
        We stock the most recognized cycle brands in the world to give you the best cycling experience.
      </p>
      <div v-if='!brands.length'>
        <Skeleton :status='brandStatus' :onReload='fetchAllBrands' />
      </div>
      <div class='card-container-background' v-else>
        <div class='card-container'>
          <div v-for='brand in brands' :key='brand._id'>
            <Card :data='brand' field='brand' />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Card from '@/components/Card'
import Skeleton from '@/components/Skeleton'

export default {
  name: 'brands',
  components: { Card, Skeleton },
  created () {
    if (!this.brands.length) this.fetchAllBrands()
  },
  computed: {
    ...mapGetters(['getBrands', 'brandStatus']),
    brands: function () {
      return this.getBrands
    }
  },
  methods: mapActions(['fetchAllBrands'])
}
</script>

<style scoped>
.item-box {
  padding: 6rem 0 3rem;
}

.item-box::before {
	border-top: 50px solid #0076b2;
  border-bottom: 100px solid transparent;
	border-left: 70vw solid #0087cc;
	border-right: 30vw solid #0098e5;
  z-index: 1;
}

.item-box::after {
  top: 0;
  background-color: #33CC33;
}

.box-title {
  padding: 1.5em 0;
  max-width: 25em;
  font-size: 40px;
  font-style: normal;
  font-weight: 400;
}

.box-title::after {
  bottom: 0;
}

@media screen and (max-width: 1024px) {
  .page-title {
    font-size: 50px;
  }

  .item-box::before {
    border-top-width: 40px;
    border-bottom-width: 80px;
  }

  .box-title {
    font-size: 30px;
  }

  .box-title::after {
    font-size: 80px;
  }
}

@media screen and (max-width: 950px) {
  .page-title {
    font-size: 40px;
  }
}

@media screen and (max-width: 680px) {
  .page-title {
    font-size: 30px;
  }

  .item-box {
    padding: 4rem 0;
  }

  .item-box::before {
    border-top-width: 30px;
    border-bottom-width: 60px;
  }

  .item-box::after {
    height: 70px;
  }

  .box-title {
    font-size: 22px;
  }

  .box-title::after {
    font-size: 50px;
  }
}

@media screen and (max-width: 560px) {
  .page-title {
    font-size: 25px;
  }

  .item-box {
    padding: 3rem 0;
  }

  .item-box::before {
    border-top-width: 20px;
    border-bottom-width: 40px;
  }

  .item-box::after {
    height: 50px;
  }
}

@media screen and (max-width: 500px) {
  .box-title {
    font-size: 18px;
  }
}

@media screen and (max-width: 420px) {
  .page-title {
    font-size: 20px;
  }

  .box-title {
    font-size: 15px;
  }
}
</style>
