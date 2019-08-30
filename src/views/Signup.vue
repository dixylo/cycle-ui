<template>  
  <div class='container user'>
    <div class='user-panel user-panel-login'>
      <div class='form-section'>
        <p id='form-title'>Create an account</p>
        <div v-if='error'>Signup failed. Please try it again.</div>
        <form
          class='user-panel-div'
          @submit.prevent='signup'
        >
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
        </form>
      </div>
      <div class='welcome-section'>
        <p id='wp1'>Welcome to Cycly!</p>
        <p id='wp2'>We rent cycles of world most recognized brands. Come enjoy cycling.</p>
        <hr>
        <p id='wp3'>Already have an account?<br>Log in to try our world top cycles!</p>
        <router-link class='link' to='/login'>Log in</router-link>
      </div>
    </div>
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
.user {
  background-image: url('../assets/login.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
}

.user-panel {
  width: 70%;
  max-width: 1024px;
  margin: auto;
  display: flex;
  justify-content: center;
  opacity: .9;
}

.user-panel-login {
  color: black;
}

.welcome-section {
  width: 40%;
  padding: 40px;
  color: #FFF;
  background-color: #003c71;
  border-radius: 0 30px 30px 0;
}

#wp1 {
  font-size: 30px;
}

#wp2 {
  font-size: 20px;
}

#wp3 {
  font-size: 15px;
}

hr {
  width: 50%;
  color: #FFF;
  border-style: double;
}

.link {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFF;
  font-size: 15px;
  font-weight: bold;
  width: 100px;
  padding: .75em;
  background: transparent;
  border: 2px solid #FFF;
  border-radius: 2em;
  margin: auto;
  text-decoration: none;
  transition: all 0.2s;
}

.link:hover {
  color: #003c71;
  background: #FFF;
}

.form-section {
  width: 60%;
  color: #003c71;
  background-color: #FFF;
  border-radius: 30px 0 0 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#form-title {
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  margin: 1em auto;
  position: relative;
}

#form-title::after {
  content: '__';
  color: #00A9E0;
  display: block;
  font-size: 50px;
  font-style: normal;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.user-panel-div {
  margin: 0 auto;
  text-align: center;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.user-panel-row {
  text-align: left;
  display: flex;
  justify-content: flex-start;
}

label {
  display: flex;
  align-items: center;
}

.form-section input {
  color: #003c71;
  border-bottom: 2px solid #003c71;
}

.user-panel-input {
  display: inline-block;
  width: 100%;
  height: 20px;
  font-size: 20px;
  margin: 10px;
  border: none;
  background-color: transparent;
  outline: none;
}

.user-panel-button {
  width: 60%;
  height: 40px;
  margin: 20px auto;
  border-radius: 5px;
  font-size: 20px;
  cursor: pointer;
  color: #FFF;
  background-color: #003c71;
  border-color: #003c71;
}

.user-panel-button:hover {
  background-color: #376FB2;
  border-color: #376FB2;
}

.user-panel-button:focus {
  outline: none;
}
</style>
