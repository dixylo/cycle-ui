<template>
  <div class='container user'>
    <div class='user-panel user-panel-login'>
      <div class='welcome-section'>
        <p class='p-one'>Thank you for being a Cycly member!</p>
        <p class='p-two'>
          Now that you have logged in, why not rent a bike and have the simple pleasure of a bike ride?
        </p>
      </div>
      <div class='form-section'>
        <p class='form-title'>My Profile</p>
        <div v-if='!user'>
          <Skeleton :status='authStatus' :onReload='fetchMe' />
        </div>
        <div class='user-panel-div' v-else>
          <input
            type='username'
            name='username'
            class='user-panel-input'
            :value="'Username:  ' + user.username"
            disabled
          />
          <input
            type='email'
            name='email'
            class='user-panel-input'
            :value="'Email:  ' + user.email"
            disabled
          />
          <input
            type='tel'
            name='phone'
            class='user-panel-input'
            :value="'Phone:  ' + user.phone"
            disabled
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Skeleton from '@/components/Skeleton'

export default {
  name: 'profile',
  components: { Skeleton },
  computed: {
    ...mapGetters(['getCurrentUser', 'authStatus']),
    user: function () {
      return this.getCurrentUser
    }
  },
  methods: mapActions(['fetchMe'])
}
</script>

<style scoped>
.user {
  background-image: url('../assets/profile.jpg');
}

.welcome-section {
  background-color: #004c00;
}

.form-section {
  color: #004c00;
}

.form-title {
  margin-top: 0;
}

.user-panel-input {
  color: #004c00;
  border-bottom-color: #004c00;
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

  .p-two {
    width: 18em;
    margin: 1em auto;
  }

  .form-section {
    width: 100%;
    border-radius: 0 0 30px 30px;
    padding: 80px 0;
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
    padding: 50px 30px 60px;
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
