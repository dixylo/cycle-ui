<template>  
  <div class='container user'>
    <div class='user-panel user-panel-login'>
      <p>Log into Cycly</p>
      <hr class='user-panel-hr' />
      <div v-if='error'>Invalid Email or Password.</div>
      <div v-if='isLoggedIn'>
        <div class='user-panel-div'>
          <br />
          <p>You are now logged in as <i>{{ username }}</i>.</p>
          <br />
          <button
            class='user-panel-button'
            @click='logout'
            :disabled='loading'
          >
            <div v-if='loading'>
              <img class='loading' alt='Loading...' src='@/assets/loading.png' />
            </div>
            <div v-else>Log out</div>
          </button> 
        </div>
      </div>
      <div v-else>
        <form
          class='user-panel-div'
          @submit.prevent='login'
        >
          <div class='user-panel-row'>
            <label htmlFor='email'>EMAIL</label>
            <input
              type='email'
              name='email'
              class='user-panel-input'
              minlength='6'
              maxlength='255'
              v-model='email'
              required
              autofocus
            />
          </div>
          <div class='user-panel-row'>
            <label htmlFor='password'>PASSWORD</label>
            <input
              type='password'
              name='password'
              class='user-panel-input'
              pattern="[A-Za-z0-9@$!%*?&]{6,255}"
              v-model='password'
              required
            />
          </div>
          <button
            class='user-panel-button'
            type='submit'
            :disabled='loading'
          >
            <div v-if='loading'>
              <img class='loading' alt='Loading...' src='@/assets/loading.png'/>
            </div>
            <div v-else>Log in</div>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters(['getCurrentUser', 'isLoggedIn', 'authStatus']),
    username: function () {
      if (!this.getCurrentUser) return 'Nobody'
      
      return this.getCurrentUser.username
    },
    loading: function () {
      return this.authStatus === 'loading'
    },
    error: function () {
      return this.authStatus === 'error'
    }
  },
  methods: {
    login: function () {
      const email = this.email
      const password = this.password
      
      this.$store.dispatch('login', { email, password })
        .then(() => {
          alert('Login Successful. Redirecting to Homepage.')
          this.$router.push('/')
        })
        .catch(err => console.log(err))
    },
    logout: function () {
      this.$store.dispatch('logout')
        .then(() => {
          alert('Logout Successful. Redirecting to Login Page.')
          this.$router.push('/login')
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>
