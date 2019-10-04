<template>
  <div class="my-account__wrapper">
    <form
      class="form__container"
      @submit.prevent=""
    >
      <div class="save__wrapper">
        <div class="edit-title">Settings</div>
        <app-button
            class="button--submit"
            text="Save"
          />
      </div>
      
      <div class="my-account__user_container">
        <div class="image__wrapper">
          <img
            :src="user.icon_url"
            class="my-account__user_icon"
            alt="icon_url"
          >
          <div class="label-box__inner">
            <label>
              <icon-camera />
              <input 
                class="setting-image"
                type="file" 
                multiple
                accept="image/jpeg, image/png"
              >
              <div class="boxFileSelect"></div>
            </label>
          </div>
        </div>

        <div class="my-account__user_account">
          <p class="my-account__user_name">
            @{{ user.name }}
          </p>
          <p class="my-account__user_email">
            myemailaddress@com
          </p>
        </div>
      </div>

      <div class="setting-form__container">
          <form-input
            class="setting-detail"
            type="register-name"
            name="register-name"
            placeholder="New Register Name"
          />
          <form-input
            class="setting-detail"
            type="email"
            name="email"
            placeholder="New Email"
          />
          <form-input
            class="setting-detail"
            type="password"
            name="password"
            placeholder="New Password"
            autocomplete="off"
          />
          <form-input
            class="setting-detail"
            type="password"
            name="password-confirm"
            placeholder="New Password Confirm"
            autocomplete="off"
          />
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import IconCamera from '~/components/Atoms/Icons/IconCamera'
import FormInput from '~/components/Molecules/FormInput'
import AppButton from '~/components/Atoms/AppButton'

export default {
  name: 'my-account',
  layout: 'user',
  components: {
    IconCamera,
    FormInput,
    AppButton
  },
  computed: {
    ...mapState({
      user: store => store.user.user,
    })
  },
  created() {
    this.initPosts()
  },
  methods: {
    ...mapActions('post', ['initPosts']),
    goToPostPage(key) {
      this.$router.push({ path: `posts/${key}` })
    }
  }
}
</script>

<style lang="scss" scoped>
.save__wrapper {
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  margin: 1rem;
}

.edit-title {
  font-weight: bold;
  font-size: 1.6rem;

}

.my-account__user_container {
  background-color: #8BD7E5;
  padding: 2.5rem 0 1rem;
  margin-bottom: 2rem;
}

.my-account__user_container {
  text-align: center;
  color: $color-white;
}

.my-account__user_icon {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: $color-white;
}

.image__wrapper {
  width: 4rem;
  margin: 0 auto;
  position: relative;
}

.label-box__inner {
  position: absolute;
  top: 23px;
  left: 5px;
  z-index: 2;
}

.my-account__user_name {
  margin-bottom: 0;
}

.my-account__user_email {
  font-size: 1rem;
}

.setting-image {
  display: none;
}

.setting-form__container {
  padding: 1rem;
}

.setting-detail {
  /deep/.app_input {
    margin-bottom: 1rem;
    padding: 1.4rem 1rem;
    border-bottom: 1px solid $gray-text-color;
    border-radius: 0;
    &::placeholder {
      text-align: left;
    }
  }
}

.button--submit {
  /deep/.app_button {
    background: $color-primary;
    color: $color-white;
    width: 8rem;
    padding: 0.5rem;
    font-size: 1.2rem;
  }
}
</style>
