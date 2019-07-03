<template>
  <div class='slides fade' :style='{ display }'>
    <!-- <img :alt='slide.name' :src='slide.url' /> -->
    <img :alt='slide.name' :src='getUrl(slide.url)' />
  </div>
</template>

<script>
export default {
  name: 'Slide',
  props: ['slide', 'display'],
  methods: {
    getUrl(url) {
      return require('@/assets/' + url)
    }
  }
}
</script>

<style scoped>
.slides {
  display: none;
}

.slides img {
  width: 100%;
}

.fade {
  -webkit-animation-name: fade;
  -webkit-animation-duration: 1.5s;
  animation-name: fade;
  animation-duration: 1.5s;
}

@-webkit-keyframes fade {
  from {opacity: .4} 
  to {opacity: 1}
}

@keyframes fade {
  from {opacity: .4} 
  to {opacity: 1}
}
</style>
