<template>
  <div class='card' :class='card' :style='height'>
    <router-link :to="{ name: field, params: { id: data._id } }">
      <div class='inner'>
        <div id='front'>
          <img :alt='data.name' :src='data.imgUrl' />
          <p class='caption' v-if="field !== 'brand'"><span>Name:</span> {{ data.name }}</p>
          <p class='caption' v-if="field === 'model'"><span>{{ parent.key }}:</span> {{ parent.name }}</p>
        </div>
        <div id='back' v-if="field !== 'model'">
          <p id='name'>{{ data.name }}</p>
          <p id='description'>{{ data.description }}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['data', 'field'],
  computed: {
    card: function () {
      return this.field === 'model' ? 'scale-card' : 'flip-card'
    },
    height: function () {
      return { height: this.field === 'type' ? '255px' : '300px' }
    },
    parent: function () {
      if (this.data.brand) return { key: 'Brand', name: this.data.brand }
      if (this.data.type) return { key: 'Type', name: this.data.type }
    }
  }
}
</script>

<style scoped>
.card {
  width: 300px;
  /* margin: 10px 20px; */
  background-color: #fff;
}

.scale-card {
  position: relative;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
}

.flip-card {
  perspective: 1000px;
}

.inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: 0.3s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}

.flip-card:hover .inner {
  transform: rotateY(180deg);
}

#front, #back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

#front {
  background-color: #f5f5f5;
  color: black;
}

#back {
  box-sizing: border-box;
  padding: 40px 30px;
  background-color: #4690F4;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  transform: rotateY(180deg);
}

.scale-card:hover {
  transform: scale(1.02);
}

img {
  width: 100%;
}

a {
  text-decoration: none;
  color: #003c71;
}

.caption {
  margin: 0;
  padding: 7px;
  font-size: 20px;
}

.caption span {
  font-size: 15px;
}

#back p {
  width: auto;
  margin: 0;
  text-align: left;
  color: #fff;
  line-height: 1.4em;
}

#name {
  width: 60%;
  padding: 0;
  font-size: 20px;
}

#description {
  padding: 1em 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5em;
  max-height: 11.4em;
  text-align: justify;
  overflow: scroll;
}
</style>
