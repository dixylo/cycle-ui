<template>
  <div class='container'>
    <div class='hero-section'>
      <div class='hero-image-box'>
        <img alt='All Types' src='@/assets/hero_types.webp' />
      </div>
      <p class='page-title'>Wide Variety of Types</p>
    </div>
    <div class='item-box'>
      <p class='box-title'>
        Where there are roads, there'll be adventurous cycling souls. Let us equip you to conquer the unconquered terrain.
      </p>
      <div v-if='!types.length'>
        <Skeleton :status='typeStatus' :onReload='fetchAllTypes' />
      </div>
      <div class='card-container-background' v-else>
        <ul class='card-container'>
          <li v-for='type in types' :key='type._id'>
            <Card :data='type' field='type' />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Card from '@/components/Card'
import Skeleton from '@/components/Skeleton'

export default {
  name: 'types',
  components: { Card, Skeleton },
  created () {
    if (!this.types.length) this.fetchAllTypes()
  },
  computed: {
    ...mapGetters(['getTypes', 'typeStatus']),
    types: function () {
      return this.getTypes
    }
  },
  methods: mapActions(['fetchAllTypes'])
}
</script>

<style scoped>
.page-title {
  text-align: right;
}

.item-box {
  padding: 6rem 0 3rem;
}

.item-box::before {
	border-top: 50px solid #007f26;
  border-bottom: 100px solid transparent;
	border-left: 432px solid #00b235;
	border-right: 1008px solid #00992d;
  z-index: 1;
}

.item-box::after {
  top: 0;
  background-color: #00A9E0;
}

.box-title {
  padding: 1.5em 0;
  max-width: 28em;
  font-size: 40px;
  font-style: normal;
  font-weight: 400;
}

.box-title::after {
  bottom: 0;
}

@media screen and (max-width: 1440px) {
  .item-box::before {
    border-left-width: 30vw;
    border-right-width: 70vw;
  }
}

@media screen and (max-width: 1080px) {
  .page-title {
    font-size: 50px;
  }

  .item-box::before {
    border-top-width: 40px;
    border-bottom-width: 80px;
  }

  .item-box::after {
    height: 100px;
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

@media screen and (max-width: 810px) {
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

@media screen and (max-width: 600px) {
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

  .box-title {
    font-size: 18px;
  }
}

@media screen and (max-width: 490px) {
  .page-title {
    font-size: 20px;
  }

  .box-title {
    font-size: 15px;
  }
}

@media screen and (max-width: 490px) {
  .box-title {
    width: 300px;
  }
}
</style>
