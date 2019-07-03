<template>
  <div id='home'>
    <Carousel :slides='slides' />
    <div id='tab-container'>
      <button id='brands' class='tab' @click="switchContent">Brands</button>
      <button id='types' class='tab' @click="switchContent">Types</button>
    </div>
    <div class='card-container'>
      <div v-for='item in items' :key='item.id'>
        <Card :data='item' :fieldId='passId(item.id)' />
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/Carousel'
import Card from '@/components/Card.vue'

export default {
  name: 'home',
  components: {
    Carousel,
    Card
  },
  data() {
    return {
      areBrandsShown: false,
      brands: [
        {
          id: 1,
          name: 'Giant',
          category: 'Race'
        },
        {
          id: 2,
          name: 'Phoenix',
          category: 'Utility'
        },
        {
          id: 3,
          name: 'Permanent',
          category: 'Mountain'
        },
        {
          id: 4,
          name: 'Sphinx',
          category: 'Kid'
        }
      ],
      types: [
        {
          id: 1,
          name: 'Race',
          category: 'Giant'
        },
        {
          id: 2,
          name: 'Utility',
          category: 'Phoenix'
        },
        {
          id: 3,
          name: 'Mountain',
          category: 'Permanent'
        },
        {
          id: 4,
          name: 'Kid',
          category: 'Sphinx'
        }
      ],
      slides: [
        {
          id: 1,
          name: 'Inception',
          url: 'Inception.jpg'
        },
        {
          id: 2,
          name: 'PacificRim',
          url: 'PacificRim.jpg'
        },
        {
          id: 3,
          name: 'Interstellar',
          url: 'Interstellar.jpg'
        }
      ]
    }
  },
  computed: {
    items: function() {
      return this.areBrandsShown ? this.brands : this.types
    }
  },
  methods: {
    switchContent(e) {
      this.areBrandsShown = e.currentTarget.id === 'brands'
    },
    passId(id) {
      return this.areBrandsShown ? { brandId: id } : { typeId: id }
    }
  }
}
</script>

<style scoped>
#home {
  margin: 0px auto;
  padding-top: 50px;
  height: 100%;
}

#tab-container {
  margin: 0px auto;
}

/* Style the tab buttons */
.tab {
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  font-size: 20px;
  width: 20%;
}

/* Change background color of buttons on hover */
.tab:hover {
  background-color: #777;
  color: #fff;
}
</style>
