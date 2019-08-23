<template>
  <div class="signup_name__container">
    <div class="soa-logo">
      <icon-balloon />
    </div>

    <div class="create_name__container">
      <form
        class="form__container"
        @submit.prevent="createName()"
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

        <div class="border--yellow" />

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

import firebase from '~/plugins/firebase'

const user = firebase.auth().currentUser

export default {
  components: {
    IconBalloon,
    AppButton
  },
  data: () => ({
    userName: ''
  }),
  methods: {
    createName() {
      user
        .updateProfile({
          displayName: this.userName
          // photoURL: ''
        })
        .then(() => {
          console.log('Update successful')
        })
        .catch(e => {
          console.error(e)
        })
    }
  }
}
</script>

<style scoped lang="scss">
.signup_name__container {
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
  margin: 0 auto 12rem;
  width: 10rem;
}

.soa-logo {
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

.border--yellow {
  background-color: $color-yellow;
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
  }
}
</style>
