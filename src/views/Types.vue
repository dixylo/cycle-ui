<template>
  <div class='container'>
    <div class='hero'>
      <div class='image-box'>
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
        <div class='card-container'>
          <div v-for='type in types' :key='type._id'>
            <Card :data='type' field='type' />
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
.hero {
  width: 100%;
  padding-top: 44.8%;
  position: relative;
}

.image-box {
  position: fixed;
  top: 3.71rem;
  left: 0;
  right: 0;
}

.image-box img {
  width: 100%;
}

.page-title {
  text-align: right;
}

.item-box {
  width: 100%;
  padding: 6rem 0 3rem;
  position: relative;
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
	border-top: 50px solid #007f26;
  border-bottom: 100px solid transparent;
	border-left: 30vw solid #00b235;
	border-right: 70vw solid #00992d;
  z-index: 1;
}

.item-box::after {
  content: '';
  width: 100vw;
	height: 100px;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: #00A9E0;
  z-index:0;
}

.box-title {
  padding: 1.5em 0;
  max-width: 28em;
  font-size: 40px;
  font-style: normal;
  font-weight: 400;
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
