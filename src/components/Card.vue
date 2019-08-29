<template>
  <div id='card'>
    <router-link :to="{ name: field, params: { id: data._id } }">
      <img :alt='data.name' :src='data.imgUrl' />
    </router-link>
    <div id='data'>
      <p>{{ data.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['data', 'field']
}
</script>

<style scoped>
#card {
  width: 300px;
  margin: 10px 20px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  /* float: left; */
  background-color: white;
}

#card:hover {
  transform: scale(1.02);
}

#card img {
  width: 100%;
}

#data {
  padding: 2px 16px;
  font-size: 25px;
}
</style>
