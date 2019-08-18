<template>
  <div class="signup__container">
    <div class="soa-logo">
      <icon-balloon />
    </div>

    <div class="navigation__container">
      <ul class="navigation__items">
        <li class="navigation--select">
          SIGN UP
        </li>
        <li>
          <nuxt-link to="login">
            LOGIN
          </nuxt-link>
        </li>
      </ul>
    </div>

    <div class="signup__sns__container">
      <app-button
        color="transparent"
        text="SIGNUP WITH INSTAGRAM"
        icon="fab fa-instagram"
      />
      <app-button
        color="transparent"
        text="SIGNUP WITH FACEBOOK"
        icon="fab fa-facebook-f"
      />
    </div>

    <div class="border--yellow" />

    <div class="signup__email__cotainer">
      <form
        class="form__container"
        @submit.prevent="signup()"
      >
        <form-input
          v-model="email"
          type="email"
          name="email"
          inner-label="Email"
        />
        <form-input
          v-model="password"
          type="password"
          name="password"
          inner-label="Password"
        />
        <form-input
          v-model="confirmPassword"
          type="password"
          name="password-confirm"
          inner-label="Password Confirm"
        />
        <app-button
          color="white"
          text="CONTINUE"
          class="button--submit"
        />
      </form>
    </div>
  </div>
</template>

<script>
import FormInput from '~/components/Molecules/FormInput.vue'
import AppButton from '~/components/Atoms/AppButton.vue'
import IconBalloon from '~/components/Atoms/Icons/IconBalloon.vue'

import firebase from 'firebase/app'
import 'firebase/auth'

const auth = firebase.auth()

export default {
  components: {
    FormInput,
    AppButton,
    IconBalloon
  },
  data: () => ({
    email: '',
    password: '',
    confirmPassword: ''
  }),
  methods: {
    signup() {
      if (this.password !== this.confirmPassword) {
        console.log('パスワードが一致していません')
        return
      }
      auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(doc => {
          console.log(`Created account: ${doc.user.email}`)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style scoped lang="scss">
.signup__container {
  background: $color-primary;
  padding-top: 3.5rem;
}

.soa-logo {
  margin: 0 auto 4rem;
  width: 10rem;
}

.soa-logo {
  /deep/ .icon--balloon {
    fill: $color-white;
  }
}

.navigation__items {
  color: #fff;
  display: flex;
  justify-content: center;
  text-align: center;
  list-style: none;
  margin-bottom: 2rem;
}

.navigation__items > li {
  width: 12rem;
  margin: 0 1rem;
}

.navigation--select {
  border-bottom: 0.4rem solid $color-white;
  font-weight: bold;
}

.signup__sns__container {
  text-align: center;
  margin: auto;
  max-width: 80%;
  /deep/ .app_button {
    width: 100%;
    margin-bottom: 1.6rem;
    font-size: 1.6rem;
  }
}

.form__container {
  margin: 0 auto;
  min-height: 100vh;
  text-align: center;
  max-width: 80%;
  /deep/ .app_input__container {
    margin-bottom: 1.6rem;
  }
}

.button--submit {
  /deep/ .app_button {
    width: 100%;
    padding: 1.4rem 2.4rem;
    border-radius: 2.4rem;
    margin-top: 1rem;
  }
}

.border--yellow {
  background-color: $color-yellow;
  height: 0.4rem;
  width: 2.4rem;
  margin: 0.4rem auto 2rem;
  border-radius: 0.2rem;
}
</style>
