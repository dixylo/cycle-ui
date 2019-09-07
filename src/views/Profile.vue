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
          <div class='user-panel-row'>
            <label htmlFor='username'>USERNAME</label>
            <input
              type='username'
              name='username'
              class='user-panel-input'
              :value='user.username'
              disabled
            />
          </div>
          <div class='user-panel-row'>
            <label htmlFor='email'>EMAIL</label>
            <input
              type='email'
              name='email'
              class='user-panel-input'
              :value='user.email'
              disabled
            />
          </div>
          <div class='user-panel-row'>
            <label htmlFor='phone'>PHONE</label>
            <input
              type='tel'
              name='phone'
              class='user-panel-input'
              :value='user.phone'
              disabled
            />
          </div>
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

.user-panel-row {
  text-align: left;
  display: flex;
  justify-content: flex-start;
  margin: .25em;
}

label {
  display: flex;
  align-items: center;
}

.form-section input {
  color: #004c00;
  border-bottom: 2px solid #004c00;
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
</style>
