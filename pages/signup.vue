<template>
  <div class="signup__container --noon">
    <div class="app_icon">
      <icon-balloon />
    </div>

    <div class="navigation__container">
      <ul class="navigation__items">
        <li class="navigation--select">
          SIGN UP
          <div class="under-line" />
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
        text="SIGNUP WITH FACEBOOK"
        icon="fab fa-facebook-f"
        @click="facebookLogin()"
      />
      <app-button
        color="transparent"
        text="SIGNUP WITH TWITTER"
        icon="fab fa-twitter"
        @click="twitterLogin()"
      />
    </div>

    <div class="border--white" />

    <div class="signup__email__cotainer">
      <form
        class="form__container"
        @submit.prevent="signup()"
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
        <form-input
          v-model="confirmPassword"
          type="password"
          name="password-confirm"
          placeholder="Password Confirm"
          autocomplete="off"
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
import FormInput from '~/components/Molecules/FormInput'
import AppButton from '~/components/Atoms/AppButton'
import IconBalloon from '~/components/Atoms/Icons/IconBalloon'

import { auth } from '~/plugins/firebase'

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
    async signup() {
      // 入力したパスワードと確認パスワードが一致していない時
      if (this.password !== this.confirmPassword) {
        console.log('パスワードが一致していません')
        return
      }
      // 入力したメールアドレスがすでに登録されている時
      const providers = await auth.fetchSignInMethodsForEmail(this.email)
      if (
        providers.findIndex(
          p =>
            p === firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD
        ) !== -1
      ) {
        console.log('登録されているメールアドレスです！')
        return
      }

      await auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(doc => {
          // メアド確認が終わっていない時
          if (!doc.user.emailVerified) {
            // メールを送信して認証する
            auth.currentUser
              .sendEmailVerification({
                // リダイレクト先のURL
                // 動作確認のため localhost
                url: 'http://localhost:3000/register-name'
              })
              .then(() => {
                console.log('Successfully sent email')
              })
          }
        })
        .catch(e => {
          console.error(e)
        })
    },
    facebookLogin() {
      const facebook = new firebase.auth.FacebookAuthProvider()
      auth.signInWithPopup(facebook).then(() => {
        this.$router.push('/posts/')
      })
    },
    twitterLogin() {
      const twitter = new firebase.auth.TwitterAuthProvider()
      auth.signInWithPopup(twitter).then(() => {
        this.$router.push('/posts')
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '~/assets/background.scss';

.signup__container {
  padding: 3.5rem 0;
  min-height: 100vh;
}

.app_icon {
  margin: 0 auto 4rem;
  width: 10rem;
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
    font-weight: bold;
  }
}

.border--white {
  background-color: $color-white;
  height: 0.4rem;
  width: 2.4rem;
  margin: 0.4rem auto 2rem;
  border-radius: 0.2rem;
}
</style>
