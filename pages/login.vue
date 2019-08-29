<template>
  <div class="login__container">
    <div class="soa-logo">
      <icon-balloon />
    </div>

    <div class="navigation__container">
      <ul class="navigation__items">
        <li>
          <nuxt-link to="signup">
            SIGN UP
          </nuxt-link>
        </li>
        <li class="navigation--select">
          LOGIN
          <div class="under-line" />
        </li>
      </ul>
    </div>

    <div class="login__sns__container">
      <app-button
        color="transparent"
        text="LOGIN WITH FACEBOOK"
        icon="fab fa-facebook-f"
        @click="facebookLogin()"
      />
      <app-button
        color="transparent"
        text="LOGIN WITH TWITTER"
        icon="fab fa-twitter"
        @click="twitterLogin()"
      />
    </div>

    <div class="border--yellow" />

    <div class="login__email__cotainer">
      <form
        class="form__container"
        @submit.prevent="login()"
      >
        <form-input
          v-model="email"
          type="email"
          name="email"
          placeholder="Email"
        />
        <form-input
          v-model="password"
          type="password"
          name="password"
          placeholder="Password"
          autocomplete="off"
        />
        <app-button
          color="white"
          text="LOGIN"
          class="button--submit"
        />
      </form>
    </div>
  </div>
</template>

<script>
import FormInput from '~/components/Molecules/FormInput'
import AppButton from '~/components/Atoms/AppButton'
import IconBalloon from '~/components/Atoms/Icons/IconBalloon'

import firebase from '~/plugins/firebase'

const auth = firebase.auth()

export default {
  components: {
    FormInput,
    AppButton,
    IconBalloon
  },
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    login() {
      auth.signInWithEmailAndPassword(this.email, this.password).then(() => {
        this.$router.push('/news_feed')
        console.log(auth.currentUser)
      })
    },
    facebookLogin() {
      const facebook = new firebase.auth.FacebookAuthProvider()
      auth.signInWithPopup(facebook).then(() => {
        this.$router.push('/news_feed')
      })
    },
    twitterLogin() {
      const twitter = new firebase.auth.TwitterAuthProvider()
      auth.signInWithPopup(twitter).then(() => {
        this.$router.push('/news_feed')
      })
    }
  }
}
</script>

<style scoped lang="scss">
.login__container {
  background: linear-gradient(
      rgba(46, 211, 211, 0.8),
      rgba(66, 106, 131, 0.8),
      rgba(72, 77, 109, 0.8)
    ),
    url('../assets/img/bg_main.png');
  background-size: cover;
  background-position: top;
  padding: 3.5rem 0;
  min-height: 100vh;
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
  font-weight: bold;
}

.under-line {
  width: 100%;
  height: 0.4rem;
  background-color: #fff;
  border-radius: 3rem;
}

.login__sns__container {
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
