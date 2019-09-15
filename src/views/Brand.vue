<template>
  <div class='container'>
    <div v-if='!brand'>
      <Skeleton
        :status='brandStatus'
        :onReload='() => this.fetchBrandById(this.$route.params.id)'
      />
    </div>
    <div v-else>
      <div class='data'>
        <div class='hero'></div>
        <div class='overview'>
          <div class='image-container'>
            <img
              :alt='brand.name'
              :src='brand.imgUrl'
            />
          </div>
          <div class='metadata'>
            <p><span>Brand Name:</span> {{ brand.name }}</p>
            <p><span>Country:</span> {{ brand.country }}</p>
            <p><span>Phone:</span> {{ brand.phone }}</p>
            <p><span>Homepage:</span> {{ brand.homepage }}</p>
          </div>
        </div>
        <div class='introduction'>
          <p><span>Introduction:</span> {{ brand.description }}</p>
        </div>
      </div>
      <div class='item-box'>
        <p class='box-title'>Models</p>
        <div class='card-container-background' v-if='brand.models.length'>
          <ul class='card-container'>
            <li v-for='model in brand.models' :key='model._id'>
              <Card :data='model' field='model' />
            </li>
          </ul>
        </div>
        <div class='no-cards' v-else>
          <h2>Oops! We haven't got any models of this brand yet.</h2>
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
  name: 'brand',
  components: { Card, Skeleton },
  computed: {
    ...mapGetters(['getBrands', 'getTheBrand', 'brandStatus']),
    brand: function () {
      const id = this.$route.params.id
      if (this.getBrands.length) {
        const brand = this.getBrands.find(b => b._id.toString() === id)
        return brand
      }
      if (!this.getTheBrand || this.getTheBrand._id.toString() !== id) {
        this.fetchBrandById(id)
      }
      return this.getTheBrand
    }
  },
  methods: mapActions(['fetchBrandById'])
}
</script>

<style scoped>
.hero {
  background-image: url('../assets/hero_brand.webp');
}

.image-container {
  width: 300px;
}

.item-box::before {
	border-top: 50px solid #376FB2;
  border-bottom: 50px solid transparent;
	border-left: 1008px solid #376FB2;
	border-right: 432px solid #00b200;
}

@media screen and (max-width: 1440px) {
  .item-box::before {
    border-left-width: 70vw;
    border-right-width: 30vw;
  }
}

@media screen and (max-width: 940px) {
  .metadata span {
    font-size: 18px;
    margin-right: .5em;
  }

  .metadata p {
    font-size: 25px;
  }
}

@media screen and (max-width: 850px) {
  .metadata span {
    font-size: 15px;
  }

  .metadata p {
    font-size: 20px;
  }

  .image-container {
    width: 250px;
  }

  .introduction span {
    font-size: 12px;
  }

  .introduction p {
    font-size: 15px;
  }

  .item-box {
    padding-top: 2rem;
  }

  .item-box::before {
    border-top-width: 30px;
    border-bottom-width: 30px;
  }
  
  .box-title {
    font-size: 40px;
  }

  .box-title::after {
    font-size: 80px;
  }
}

@media screen and (max-width: 720px) {
  .overview {
    padding: 25px 0;
  }

  .metadata span {
    font-size: 12px;
  }

  .metadata p {
    font-size: 15px;
  }

  .image-container {
    width: 200px;
  }

  .introduction span {
    font-size: 12px;
  }

  .introduction p {
    font-size: 15px;
  }
}

@media screen and (max-width: 580px) {
  .data {
    padding: 30px;
  }

  .overview {
    padding: 5px 0;
    flex-direction: column;
    align-items: center;
  }

  .image-container {
    width: 250px;
  }

  .metadata {
    width: 100%;
  }

  .metadata p {
    margin: .5em 0;
  }

  .item-box::before {
    border-top-width: 25px;
    border-bottom-width: 25px;
  }

  .box-title {
    font-size: 30px;
  }

  .box-title::after {
    font-size: 60px;
  }
}

@media screen and (max-width: 360px) {
  .image-container {
    width: 200px;
  }
}
</style>
