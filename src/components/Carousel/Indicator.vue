<template>
  <div id='indicator'>
    <div class='dot-box' v-for='index in array' :key='index'>
      <span
        class='dot'
        :class="{'active': index === currentIndex}"
        @click='handleClick(index)'
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Indicator',
  props: ['number', 'currentIndex', 'onClick'],
  computed: {
    array: function() {
      return Array.from(Array(this.number).keys())
    }
  },
  methods: {
    handleClick(index) {
      if (this.onClick) this.onClick(index)
    }
  }
}
</script>

<style scoped>
#indicator {
  text-align: center;
}

.dot-box {
  display: inline;
}

/* The dots/bullets/indicators */
.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active, .dot:hover {
  background-color: #717171;
}
</style>
