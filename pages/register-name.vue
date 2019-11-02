<template>
  <div class="signup_name__container --noon">
    <div class="app_icon">
      <icon-balloon />
    </div>

    <div class="create_name__container">
      <form
        class="form__container"
        @submit.prevent="createUser()"
      >
        <input
          v-model="userName"
          type="text"
          class="create_name__input"
        >
        <div class="under-line" />
        <p class="create_name__description">
          リスナーとして表示される名前を入力してください。<br>
          コメント、いいねの欄に表示されます。<br>
          トラベラーネームもリスナーネームと同じ名前になります。
        </p>

        <div class="border--white" />

        <app-button
          color="white"
          text="SUBMIT"
          class="button--submit"
        />
      </form>
    </div>
  </div>
</template>

<script>
import IconBalloon from '~/components/Atoms/Icons/IconBalloon'
import AppButton from '~/components/Atoms/AppButton'

import { db, auth } from '~/plugins/firebase'
const usersCollection = db.collection('users')

export default {
  components: {
    IconBalloon,
    AppButton
  },
  data: () => ({
    userName: ''
  }),
  created() {
    console.log(auth.currentUser.uid)
  },
  methods: {
    async createUser() {
      if (!this.userName) {
        return
      }

      await usersCollection.doc(auth.currentUser.uid).set({
        bookmarks: [],
        introduction: ''
      })
      
      auth.currentUser.updateProfile({
          displayName: this.userName
          // photoURL: ''
        })
        .then(() => {
          console.log('Profile update successful')
          this.$router.push('/')
        })
        .catch(e => {
          console.error(e)
        })
    }
  }
}
</script>

<style scoped lang="scss">
@import '~/assets/background.scss';

.signup_name__container {
  background: linear-gradient(180deg, #026cb9 0%, #5ba7d6 75%, #fddade 100%);
  padding: 3.5rem 0;
  min-height: 100vh;
}

.app_icon {
  margin: 0 auto 12rem;
  width: 10rem;
  /deep/ .icon--balloon {
    fill: $color-white;
  }
}

.create_name__container {
  width: 27rem;
  margin: 0 auto;
  position: relative;
}

.create_name__input {
  color: #fff;
  font-size: 4rem;
  width: 100%;
  padding: 0.4rem 1rem;
  margin-bottom: 3rem;
  outline: none;
  border: none;
  background-color: rgba($color: #fff, $alpha: 0.3);
}

.under-line {
  width: 28rem;
  height: 0.4rem;
  background-color: #fff;
  border-radius: 3rem;
  margin: auto;
  position: absolute;
  top: 5rem;
  left: -0.5rem;
}

.create_name__description {
  font: Medium 14px/22px Vibur;
  color: $color-white;
  margin-bottom: 3rem;
}

.border--white {
  background-color: $color-white;
  height: 0.4rem;
  width: 2.4rem;
  margin: 0rem auto 4rem;
  border-radius: 0.2rem;
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
</style>
