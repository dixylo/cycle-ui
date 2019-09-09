<template>  
  <div class='container user'>
    <div class='user-panel'>
      <div class='welcome-section'>
        <p id='wp1'>Welcome back!</p>
        <p id='wp2'>Cycly is ready to give you the best cycle-renting service. Go enjoy cycling.</p>
        <hr>
        <p id='wp3'>New to Cycly? Why not sign up and try our world top cycles?</p>
        <router-link class='link' to='/signup'>Sign up</router-link>
      </div>
      <div class='form-section'>
        <p id='form-title'>Log into Cycly</p>
        <p v-if="status === 'error'">Invalid Email or Password.</p>
        <form
          class='user-panel-div'
          @submit.prevent='login'
        >
          <input
            type='email'
            name='email'
            class='user-panel-input'
            minlength='6'
            maxlength='255'
            placeholder='Email address'
            v-model='email'
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
          <Button
            class='user-panel-button'
            type='submit'
            :status='status'
          >
            Log in
          </Button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button'

export default {
  name: 'login',
  components: { Button },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    status: function () {
      return this.$store.getters.authStatus
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
.user {
  box-sizing: border-box;
  padding: 50px;
  background-image: url('../assets/login.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
}

.user-panel {
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
  border-radius: 30px 0 0 30px;
}

#wp1 {
  font-size: 30px;
}

#wp2 {
  font-size: 20px;
}

#wp3 {
  width: 15em;
  margin: 1em auto;
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
  color: #003C71;
  background-color: #FFF;
  border-radius: 0 30px 30px 0;
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
  color: #003C71;
  border-bottom: 2px solid #003C71;
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
  background-color: #003C71;
  border-color: #003C71;
}

.user-panel-button:hover {
  background-color: #376FB2;
  border-color: #376FB2;
}

@media screen and (max-width: 750px) {
  .user-panel {
    flex-direction: column;
  }

  .welcome-section {
    box-sizing: border-box;
    width: 100%;
    border-radius: 30px 30px 0 0;
    padding-bottom: 50px;
  }

  #wp2 {
    width: 18em;
  }

  .form-section {
    width: 100%;
    border-radius: 0 0 30px 30px;
    padding: 30px 0;
  }
}

@media screen and (max-width: 540px) {
  .user {
    padding: 0;
  }

  .user-panel {
    margin: 0;
    width: 100%;
    height: 100%;
  }

  .welcome-section {
    border-radius: 0;
  }

  #wp2 {
    margin: 1em auto;
  }

  .form-section {
    border-radius: 0;
  }
}

@media screen and (max-width: 440px) {
  #wp2 {
    width: 12em;
  }
}
</style>
