<template>  
  <div class='container user'>
    <div class='user-panel'>
      <div class='form-section'>
        <p class='form-title'>Create an account</p>
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
        <p class='p-one'>Welcome to Cycly!</p>
        <p class='p-two'>We rent cycles of world most recognized brands. Come enjoy cycling.</p>
        <hr class='user-hr'>
        <p class='p-three'>Already have an account?<br>Log in to try our world top cycles!</p>
        <router-link class='link' to='/login'>Log in</router-link>
      </div>
    </div>
    <Modal 
      :visibility='isModalVisible'
      :onOk='handleOk'
      :header='modalHeader'
      :body='modalBody'
    />
  </div>
</template>

<script>
import Button from '@/components/Button'
import Modal from '@/components/Modal'

export default {
  name: 'signup',
  components: { Button, Modal },
  data () {
    return {
      username: '',
      password: '',
      password_confirmed: '',
      email: '',
      phone: '',
      isModalVisible: false,
      modalHeader: '',
      modalBody: '',
      modalCallback: null
    }
  },
  computed: {
    status: function () {
      return this.$store.getters.authStatus
    }
  },
  methods: {
    signup: function () {
      if (this.password !== this.password_confirmed) {
        return this.showModal('Inconsistent Password', 'Please confirm your password.')
      }

      const data = {
        username: this.username,
        email: this.email,
        password: this.password,
        phone: this.phone
      }

      this.$store.dispatch('signup', data)
        .then(() => {
          this.showModal(
            'Signup Successful',
            'We are coming back to Homepage',
            () => this.$router.push('/')
          )
        })
        .catch(err => console.log(err))
    },
    showModal (header, body, callback) {
      this.modalHeader = header
      this.modalBody = body
      this.modalCallback = callback
      this.isModalVisible = true
    },
    handleOk () {
      this.isModalVisible = false
      if (this.modalCallback) this.modalCallback()
    }
  }
}
</script>

<style scoped>
.welcome-section {
  border-radius: 0 30px 30px 0;
}

.form-section {
  border-radius: 30px 0 0 30px;
}

@media screen and (max-width: 810px) {
  .user-panel {
    flex-direction: column-reverse;
  }

  .welcome-section {
    box-sizing: border-box;
    width: 100%;
    border-radius: 30px 30px 0 0;
  }

  .p-two {
    width: 18em;
  }

  .form-section {
    width: 100%;
    border-radius: 0 0 30px 30px;
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

  .p-two {
    margin: 1em auto;
  }

  .form-section {
    border-radius: 0;
  }
}

@media screen and (max-width: 440px) {
  .p-two {
    width: 12em;
  }
}
</style>
