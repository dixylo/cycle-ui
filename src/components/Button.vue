<template>
  <button
    :type="type || 'button'"
    :disabled="status === 'loading'"
    @click='handleClick'
  >
    <div id='loading-style' v-if="status === 'loading'">
      <img class='loading' alt='Loading...' src='@/assets/loading.png'/>
      <span>Loading</span>
    </div>
    <div v-else>
      <slot></slot>
    </div>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: ['type', 'status', 'onClick'],
  methods: {
    handleClick () {
      if (this.onClick) this.onClick()
    }
  }
}
</script>

<style scoped>
button {
  cursor: pointer;
}

button:focus {
  outline: none;
}

#loading-style {
  display: flex;
  justify-content: center;
  align-items: center;
}

#loading-style span {
  margin-left: .5em;
}
</style>
