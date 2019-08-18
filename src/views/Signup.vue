<template>  
  <div class='container user'>
    <form
      class='user-panel user-panel-login'
      @submit.prevent='signup'
    >
      <p>Sign up</p>
      <div v-if='error'>Signup failed. Please try it again.</div>
      <hr class='user-panel-hr' />
      <div class='user-panel-div'>
        <div class='user-panel-row'>
          <label htmlFor='username'>USERNAME</label>
          <input
            type='username'
            name='username'
            class='user-panel-input'
            pattern='[A-Za-z0-9-._]{4,20}'
            v-model='username'
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
        <div class='user-panel-row'>
          <label htmlFor='confirm-password'>CONFIRM PASSWORD</label>
          <input
            type='password'
            name='confirm-password'
            class='user-panel-input'
            pattern="[A-Za-z0-9@$!%*?&]{6,255}"
            v-model='password_confirmed'
            required
          />
        </div>
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
          />
        </div>
        <div class='user-panel-row'>
          <label htmlFor='phone'>PHONE</label>
          <input
            type='tel'
            name='phone'
            class='user-panel-input'
            pattern='[+]?[0-9\s]{6,20}'
            v-model='phone'
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
          <div v-else>Sign up</div>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'signup',
  data () {
    return {
      username: '',
      password: '',
      password_confirmed: '',
      email: '',
      phone: ''
    }
  },
  computed: {
    loading: function () {
      return this.$store.getters.authStatus === 'loading'
    },
    error: function () {
      return this.$store.getters.authStatus === 'error'
    }
  },
  methods: {
    signup: function () {
      if (this.password !== this.password_confirmed) return alert('Inconsistent Password.')

      const data = {
        username: this.username,
        email: this.email,
        password: this.password,
        phone: this.phone
      }

      this.$store.dispatch('signup', data)
        .then(() => {
          alert('Signup Successful. Redirecting to Homepage.')
          this.$router.push('/')
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>
