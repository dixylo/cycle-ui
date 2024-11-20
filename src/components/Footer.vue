<template>
  <div id='footer'>
    <p>&copy;&nbsp;{{ currentYear }} Copyright by CYCLY&trade;. All Rights Reserved.</p>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
}
</script>

<style scoped>
#footer {
  background-color: #00284c;
  overflow: hidden;
  text-align: center;
  color: white;
  position: relative;
  z-index: 1;
}

@media screen and (max-width: 465px) {
  #footer p {
    font-size: 15px;
  }
}
</style>
