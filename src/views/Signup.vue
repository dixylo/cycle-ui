<template>  
  <div class='container user'>
    <div class='user-panel'>
      <div class='form-section'>
        <p id='form-title'>Create an account</p>
        <div v-if="status === 'error'">Signup failed. Please try it again.</div>
        <form
          class='user-panel-div'
          @submit.prevent='signup'
        >
          <input
            type='username'
            name='username'
            class='user-panel-input'
            pattern='[A-Za-z0-9-._]{4,20}'
            placeholder='Username'
            v-model='username'
            required
            autofocus
          />
          <input
            type='password'
            name='password'
            class='user-panel-input'
            pattern="[A-Za-z0-9@$!%*?&]{6,255}"
            placeholder='Password'
            v-model='password'
            required
          />
          <input
            type='password'
            name='confirm-password'
            class='user-panel-input'
            pattern="[A-Za-z0-9@$!%*?&]{6,255}"
            placeholder='Repeat password to confirm '
            v-model='password_confirmed'
            required
          />
          <input
            type='email'
            name='email'
            class='user-panel-input'
            minlength='6'
            maxlength='255'
            placeholder='Email address'
            v-model='email'
            required
          />
          <input
            type='tel'
            name='phone'
            class='user-panel-input'
            pattern='[+]?[0-9\s]{6,20}'
            placeholder='Phone number'
            v-model='phone'
            required
          />
          <Button
            class='user-panel-button'
            type='submit'
            :status='status'
          >
            Sign up
          </Button>
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
import Button from '@/components/Button'

export default {
  name: 'signup',
  components: { Button },
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
    status: function () {
      return this.$store.getters.authStatus
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
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.user-panel-input {
  height: 1em;
  font-size: 20px;
  margin: .5em;
  border: none;
  color: #003c71;
  border-bottom: 2px solid #003c71;
  background-color: transparent;
  outline: none;
}

.user-panel-button {
  width: 60%;
  height: 40px;
  margin: 20px auto;
  border-radius: 5px;
  font-size: 20px;
  color: #FFF;
  background-color: #003c71;
  border-color: #003c71;
}

.user-panel-button:hover {
  background-color: #376FB2;
  border-color: #376FB2;
}
</style>
