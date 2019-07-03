<template>
  <div id='cycle'>
    <div class='overview'>
      <div class='image-container'>
        <img
          alt='Cycle Name'
          src='@/assets/logo.png'
          :style="{ width: '100%' }"
        />
      </div>
      <div class='metadata'>
        <p><span>Name:</span> {Cycle.name}</p>
        <p><span>Brand:</span> {{ $route.params.brandId }}</p>
        <p><span>Type:</span> {{ $route.params.typeId }}</p>
        <p><span>Stars:</span> {Cycle.stars}</p>
        <p><span>Category:</span> {Cycle.category}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'cycle'
}
</script>

<style scoped>
#cycle {
  margin: 0 auto;
  width: 1024px;
  overflow: auto;
}

@media screen and (max-width: 1024px) {
  #cycle {
    width: calc(100% - 100px);
  }
}
</style>
