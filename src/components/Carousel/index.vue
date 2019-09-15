<template>
  <div id='carousel'>
    <div v-for='(slide, index) in slides' :key='slide.id'>
      <Slide :slide='slide' :display='switchSlide(index)' />
    </div>
    <Arrow
      direction='left'
      :onClick='toAdjacentSlide'
    />
    <Arrow
      direction='right'
      :onClick='toAdjacentSlide'
    />
    <Indicator :number='slides.length' :currentIndex='currentIndex' :onClick='toParticularSlide'/>
  </div>
</template>

<script>
import Slide from './Slide.vue'
import Arrow from './Arrow.vue'
import Indicator from './Indicator.vue'

export default {
  name: 'Carousel',
  components: {
    Slide,
    Arrow,
    Indicator
  },
  props: ['slides'],
  created() {
    this.timer = setInterval(() => { this.toAdjacentSlide(); }, 4000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    switchSlide(index) {
      return index === this.currentIndex ? 'block' : 'none';
    },
    toAdjacentSlide(direction) {
      let currentIndex = this.currentIndex;
      currentIndex += direction === 'left' ? -1 : 1;
      const numberOfSlides = this.slides.length;
      if (currentIndex > numberOfSlides - 1) { currentIndex = 0 }
      if (currentIndex < 0) { currentIndex = numberOfSlides - 1 }
      this.currentIndex = currentIndex
    },
    toParticularSlide(index) {
      this.currentIndex = index
    }
  }
}
</script>

<style scoped>
* { box-sizing: border-box; }

/* Slideshow container */
#carousel {
  max-width: 1440px;
  position: relative;
  margin: auto;
}
</style>
