<template>
  <div id="header">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->

    <div class='navbar-collapsed'>
      <router-link class='nav-logo' to='/'>
        <img alt='icon' src='@/assets/logo.png' />
        <span><b>CYCLY</b></span>
      </router-link>
      <button class='nav-button' @click='toggleMenu'>
        <span class='tribar'></span>
        <span class='tribar'></span>
        <span class='tribar'></span>
      </button>
    </div>
    <div 
      class='navbar-menu'
      :class="{responsive: isCollapsedMenuVisible}"
    >
      <div class='nav-feature'>
        <router-link class='nav-item' to='/'>Home</router-link>
        <router-link class='nav-item' to='/brands'>Brands</router-link>
        <router-link class='nav-item' to='/types'>Types</router-link>
        <router-link class='nav-item' to='/about'>About</router-link>
        <router-link class='nav-item' to='/contact'>Contact</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isCollapsedMenuVisible: false
    }
  },
  methods: {
    toggleMenu() {
      this.isCollapsedMenuVisible = !this.isCollapsedMenuVisible
    }
  }
}
</script>

<style scoped>
#header {
  background-color: #3e3b49;
  overflow: hidden;
  display: flex;
  flex-direction: row;
}

/* #nav {
  padding: 30px;
  color: #fff;
}

#nav a {
  font-weight: bold;
  color: #fff;
  text-decoration: none;
}

#nav a:hover {
  color: #3e3b49;
  background-color: #f2f2f2;
  border-radius: 5px;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */

.navbar-collapsed {
  display: flex;
  justify-content: space-between;
}

.navbar-menu {
  display: flex;
  justify-content: space-between;
  flex: 1;
}

.nav-item {
  color: #f2f2f2;
  text-decoration: none;
  font-size: 20px;
  text-align: center;
  padding: 14px 26px;
  display: inline-block;
}

.nav-item:hover {
  color: #3e3b49;
  background-color: #f2f2f2;
  border-radius: 5px;
}

.nav-button {
  margin-right: 26px;
  display: none;
  padding: 0;
  border: none;
  border-radius: 5px;
  background: transparent;
}

.nav-button:focus {
  outline: 0;
}

.nav-button:hover {
  background-color: #f2f2f2;
}

.nav-button:hover .tribar {
  border-color: #3e3b49;
}

.tribar {
  margin: 10px;
  display: block;
  width: 30px;
  height: 1px;
  background-color: #f2f2f2;
  border: 1px solid #f2f2f2;
  border-radius: 1px;
}

.nav-logo {
  color: #f2f2f2;
  text-decoration: none;
  padding: 14px 26px;
  font-size: 20px;
  font-family: 'Courier New', Courier, monospace;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-logo img {
  width: 30px;
  display: inline-block;
  vertical-align: sub;
}

.nav-hr {
  display: none;
  color: #f2f2f2;
  width: 90%;
}

@media screen and (max-width: 890px) {
  .navbar-collapsed {
    flex: 1;
  }

  .navbar-menu {
    display: none;
  }

  .navbar-menu.responsive {
    display: block;
    /* align-items: space-around; */
    position: absolute;
    top: 54px;
    right: 0;
    z-index: 1;
    background-color: #3e3b49;
  }

  .nav-button {
    display: inline-block;
  }

  .nav-item {
    display: block;
  }

  .nav-hr {
    display: block;
  }
}
</style>
