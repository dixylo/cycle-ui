<template>  
  <div class='container user'>
    <div class='user-panel'>
      <div class='welcome-section'>
        <p class='p-one'>Welcome back!</p>
        <p class='p-two'>Cycly is ready to give you the best cycle-renting service. Go enjoy cycling.</p>
        <hr class='user-hr'>
        <p class='p-three'>New to Cycly? Why not sign up and try our world top cycles?</p>
        <router-link class='link' to='/signup'>Sign up</router-link>
      </div>
      <div class='form-section'>
        <p class='form-title'>Log into Cycly</p>
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
  name: 'login',
  components: { Button, Modal },
  data () {
    return {
      email: '',
      password: '',
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
    login: function () {
      const email = this.email
      const password = this.password
      
      this.$store.dispatch('login', { email, password })
        .then(() => {
          this.showModal(
            'Login Successful',
            'Now you can rent a bike or check out your previous rentals.',
            () => this.$router.go(-1)
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

  .p-two {
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
