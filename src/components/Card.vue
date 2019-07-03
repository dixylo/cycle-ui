<template>
  <div id='card'>
    <router-link :to="{ name: page, params: fieldId }">
      <img alt='Vue logo' src='@/assets/logo.png'>
    </router-link>
    <div id='data'>
      <p>{{ data.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['data', 'fieldId'],
  computed: {
    page: function() {
      if (!this.fieldId) return
      if (this.fieldId.brandId && !this.fieldId.typeId) return 'brand'
      if (!this.fieldId.brandId && this.fieldId.typeId) return 'type'
      if (this.fieldId.brandId && this.fieldId.typeId) return 'cycle'
    }
  }
}
</script>

<style scoped>
#card {
  width: 300px;
  margin: 10px 20px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  float: left;
  background-color: white;
}

#card:hover {
  transform: scale(1.02);
}

#card img {
  width: 100%;
  height: 300px;
}

#data {
  padding: 2px 16px;
  font-size: 25px;
}
</style>
