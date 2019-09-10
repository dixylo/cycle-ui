<template>
  <div class='container user'>
    <div class='user-panel user-panel-login'>
      <div class='welcome-section'>
        <p id='wp1'>Thank you for being a Cycly member!</p>
        <p id='wp2'>
          Now that you have logged in, why not rent a bike and have the simple pleasure of a bike ride?
        </p>
      </div>
      <div class='form-section'>
        <p id='form-title'>My Profile</p>
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
  box-sizing: border-box;
  padding: 50px;
  background-image: url('../assets/profile.jpg');
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
  background-color: #004c00;
  border-radius: 30px 0 0 30px;
}

#wp1 {
  font-size: 30px;
}

#wp2 {
  font-size: 20px;
}

.form-section {
  width: 60%;
  color: #004c00;
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
  margin: 0 auto 1em;
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

.user-panel-input {
  display: inline-block;
  width: 100%;
  height: 20px;
  font-size: 20px;
  margin: 10px;
  border: none;
  color: #004c00;
  border-bottom: 2px solid #004c00;
  background-color: transparent;
  outline: none;
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
  #wp2 {
    width: 12em;
  }
}
</style>
