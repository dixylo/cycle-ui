<template>
  <div id='header'>
    <div class='wrapper'>
      <div class='navbar-collapsed'>
        <router-link class='nav-logo' to='/'>
          <span><b>CYCLY</b></span>
        </router-link>
        <button class='nav-button' @click='toggleMenu'>
          <div class='bar-one' :class='{ cross: isCollapsedMenuVisible }'></div>
          <div class='bar-two' :class='{ cross: isCollapsedMenuVisible }'></div>
          <div class='bar-three' :class='{ cross: isCollapsedMenuVisible }'></div>
        </button>
      </div>
      <div
        class='navbar-menu'
        :class='{ responsive: isCollapsedMenuVisible }'
        @click.prevent='closeMenu'
      >
        <div>
          <router-link class='nav-item' to='/'>Home</router-link>
          <router-link class='nav-item' to='/brands'>Brands</router-link>
          <router-link class='nav-item' to='/types'>Types</router-link>
          <router-link class='nav-item' to='/about'>About</router-link>
          <router-link class='nav-item' to='/contact'>Contact</router-link>
        </div>
        <hr class='nav-hr' />
        <div>
          <div v-if='isLoggedIn'>
            <span v-if='isAdminLoggedIn'>
              <router-link class='nav-item' to='/admin'>Admin</router-link>
            </span>
            <span v-else>
              <router-link class='nav-item' to='/rentals'>Rentals</router-link>
            </span>
            <router-link class='nav-item' to='/profile'>Me</router-link>
            <span class='nav-item' @click.prevent='logout'>Log out</span>
          </div>
          <div v-else>
            <router-link class='nav-item' to='/login'>Log in</router-link>
            <router-link class='nav-item' to='/signup'>Sign up</router-link>
          </div>
        </div>
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
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    },
    isAdminLoggedIn: function () {
      return this.$store.getters.isAdminLoggedIn
    }
  },
  methods: {
    toggleMenu () {
      this.isCollapsedMenuVisible = !this.isCollapsedMenuVisible
    },
    closeMenu () {
      this.isCollapsedMenuVisible = false
    },
    logout: function () {
      this.$store.dispatch('logout')
        .then(() => this.$router.push('/login'))
        .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>
#header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 3.7rem;
  background-color: #00284c;
}

.wrapper {
  margin: 0 auto;
  padding: 0 1rem;
  max-width: 1300px;
  display: flex;
  justify-content: space-between;
}

.navbar-collapsed {
  display: flex;
  justify-content: space-between;
}

.nav-logo {
  padding: 1rem 1.5rem;
  color: #f2f2f2;
  text-decoration: none;
  font-family: 'Courier New', Courier, monospace;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-button {
  position: relative;
  z-index: 200;
  margin-right: 26px;
  padding: 0;
  border: none;
  display: none;
  background: transparent;
  cursor: pointer;
}

.nav-button:focus {
  outline: 0;
}

.bar-one, .bar-two, .bar-three {
  width: 30px;
  height: 3px;
  margin: 8px 0;
  border-radius: 1.5px;
  background-color: #fff;
  transition: 0.4s;
}

.cross.bar-one {
  -webkit-transform: rotate(-45deg) translate(-9px, 6px);
  transform: rotate(-45deg) translate(-8px, 7px);
}

.cross.bar-two {
  opacity: 0;
}

.cross.bar-three {
  -webkit-transform: rotate(45deg) translate(-8px, -8px);
  transform: rotate(45deg) translate(-8px, -8px);
}

.navbar-menu {
  display: flex;
  justify-content: space-between;
  flex: 1;
}

.nav-item {
  padding: 1rem 1.5rem;
  display: inline-block;
  color: #f2f2f2;
  text-decoration: none;
  text-align: center;
}

.nav-item:hover {
  background-color: #003666;
  cursor: pointer;
}

.nav-hr {
  width: 90%;
  display: none;
  color: #f2f2f2;
}

@media screen and (max-width: 1000px) {
  .navbar-collapsed {
    flex: 1;
  }

  .navbar-menu {
    display: none;
  }

  .navbar-menu.responsive {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    padding: 50px 0 25px;
    background-color: #00284c;
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
