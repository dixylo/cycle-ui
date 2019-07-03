<template>
  <div
    class='slide-arrow'
    v-bind:class='direction'
    @click='handleClick'
  >
    <span v-html='arrow'></span>
  </div>
</template>

<script>
export default {
  name: 'Arrow',
  props: ['direction', 'onClick'],
  computed: {
    arrow: function() {
      return this.direction === 'left' ? '&#10094;' : '&#10095;'
    }
  },
  methods: {
    handleClick() {
      this.onClick(this.direction)
    }
  }
}
</script>

<style scoped>
.slide-arrow {
  cursor: pointer;
  position: absolute;
  top: calc(50% - 30px);
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 30px;
  transition: 0.2s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

/* Position the "next button" to the right */
.right {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.slide-arrow:hover {
  background-color: rgba(0,0,0,0.8);
}
</style>
