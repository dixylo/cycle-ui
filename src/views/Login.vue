<template>  
  <div class='container user'>
    <div class='user-panel user-panel-login'>
      <div class='welcome-section'>
        <p id='wp1'>Welcome back!</p>
        <p id='wp2'>Cycly is ready to give you the best cycle-renting service. Go enjoy cycling.</p>
        <hr>
        <p id='wp3'>New to Cycly?<br>Why not sign up and try our world top cycles?</p>
        <router-link class='link' to='/signup'>Sign up</router-link>
      </div>
      <div class='form-section'>
        <p id='form-title'>Log into Cycly</p>
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
  background-color: #004c00;
  border-radius: 30px 0 0 30px;
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
  color: #004c00;
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
  text-align: center;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.user-panel-row {
  text-align: right;
  display: flex;
  justify-content: flex-end;
}

label {
  display: flex;
  align-items: center;
}

.form-section input {
  color: #003C71;
  border-bottom: 2px solid #003C71;
}

.user-panel-input {
  display: inline-block;
  width: 72%;
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
  background-color: #003C71;
  border-color: #003C71;
}

.user-panel-button:hover {
  background-color: #376FB2;
  border-color: #376FB2;
}

.user-panel-button:focus {
  outline: none;
}
</style>
