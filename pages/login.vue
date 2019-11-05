<template>
  <div class="login__container --noon">
    <div class="app_icon">
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
        @click="snsLogin('facebook')"
      />
      <app-button
        color="transparent"
        text="LOGIN WITH TWITTER"
        icon="fab fa-twitter"
        @click="snsLogin('twitter')"
      />
    </div>

    <div class="border--white" />

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

import firebase, { db, auth } from '~/plugins/firebase'
const usersCollection = db.collection('users')

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
        this.$router.push('/')
      })
    },
    snsLogin(sns) {
      let provider = ''
      switch (sns) {
        case 'facebook':
          provider = new firebase.auth.FacebookAuthProvider()
          break
        case 'twitter':
          provider = new firebase.auth.TwitterAuthProvider()
          break
      }

      auth.signInWithPopup(provider).then(auth => {
        usersCollection.get().then(snapshot => {
          const existUser = snapshot.docs.some(doc => {
            return auth.user.uid === doc.id
          })

          // コレクションに情報があったら、index
          if (existUser) {
            this.$router.push('/')
            return
          }
          
          // なければ、サインアップの処理
          this.$router.push('/register-name')

        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '~/assets/background.scss';

.login__container {
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
