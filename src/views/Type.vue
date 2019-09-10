<template>
  <div class='container'>
    <div v-if='!type'>
      <Skeleton
        :status='typeStatus'
        :onReload='() => this.fetchTypeById(this.$route.params.id)'
      />
    </div>
    <div v-else>
      <div class='data'>
        <div class='hero'></div>
        <div class='overview'>
          <div class='image-container'>
            <img
              :alt='type.name'
              :src='type.imgUrl'
            />
          </div>
          <div class='metadata'>
            <p><span>Type Name:</span> {{ type.name }}</p>
            <p><span>Introduction:</span> {{ type.description }}</p>
          </div>
        </div>
      </div>
      <div class='item-box'>
        <p class='box-title'>Models</p>
        <div class='card-container-background' v-if='type.models.length'>
          <div class='card-container'>
            <div v-for='model in type.models' :key='model._id'>
              <Card :data='model' field='model' />
            </div>
          </div>
        </div>
        <div class='no-cards' v-else>
          <h2>Oops! We haven't got any models of this type yet.</h2>
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
  name: 'type',
  components: { Card, Skeleton },
  computed: {
    ...mapGetters(['getTypes', 'getTheType', 'typeStatus']),
    type: function () {
      const id = this.$route.params.id
      if (this.getTypes.length) {
        const type = this.getTypes.find(t => t._id.toString() === id)
        return type
      }
      if (!this.getTheType || this.getTheType._id.toString() !== id) {
        this.fetchTypeById(id)
      }
      return this.getTheType
    }
  },
  methods: mapActions(['fetchTypeById'])
}
</script>

<style scoped>
.hero {
  background-image: url('../assets/hero_type.webp');
}

.metadata {
  max-width: 400px;
}

.item-box::before {
	border-top: 50px solid #008000;
  border-bottom: 50px solid transparent;
	border-left: 30vw solid #00A9E0;
	border-right: 70vw solid #008000;
}

@media screen and (max-width: 1080px) {
  .image-container {
    width: 400px;
  }

  .metadata span {
    font-size: 18px;
  }

  .metadata p {
    font-size: 25px;
  }
}

@media screen and (max-width: 950px) {
  .image-container {
    width: 350px;
  }

  .metadata span {
    font-size: 15px;
  }

  .metadata p {
    font-size: 20px;
  }
}

@media screen and (max-width: 900px) {
  .image-container {
    width: 300px;
  }
}

@media screen and (max-width: 850px) {
  .overview {
    padding: 0;
    flex-direction: column;
    align-items: center;
  }

  .image-container {
    width: 350px;
  }

  .metadata {
    width: 100%;
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

@media screen and (max-width: 580px) {
  .data {
    padding: 30px;
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

@media screen and (max-width: 500px) {
  .image-container {
    width: 300px;
  }

  .metadata span {
    font-size: 12px;
  }

  .metadata p {
    font-size: 15px;
  }  
}

@media screen and (max-width: 410px) {
  .image-container {
    width: 250px;
  }
}
</style>
