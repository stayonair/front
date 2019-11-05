<template>
  <div class="registration_modal">
    <div 
      class="mask"
      @click="hiddenModal"
    />
    <div class="modal_content__wrapper">
      <div 
        class="icon_close_wrapper"
        @click="hiddenModal"
      >
        <icon-close class="icon_close" />
      </div>
      <div class="modal_content">
        <icon-balloon class="icon_balloon" />
        <p class="modal_text">
          StayOnAir にユーザー登録すると、録音投稿やフォローをすることができます。
        </p>
        <app-button
          class="btn_register"
          text="ユーザー登録する"
          @click="$router.push('/signup')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import IconBalloon from '~/components/Atoms/Icons/IconBalloon'
import IconClose from '~/components/Atoms/Icons/IconClose'
import AppButton from '~/components/Atoms/AppButton'

export default {
  name: 'RegistrationModal',
  components: {
    IconBalloon,
    IconClose,
    AppButton
  },
  methods: {
    hiddenModal() {
      this.$emit('hiddenModal')
    }
  }
}
</script>

<style scoped lang="scss">
  .mask {
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    z-index: 1;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }

  .modal_content__wrapper {
    width: 100%;
    position: fixed;
    top: 25%;
    left: 9%;
    z-index: 13;
    width: 80%;
    background: $color-white;
    padding: 2.5rem;
    letter-spacing: .5px;
    border-radius: 7px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }

  .modal {
    &_text {
      padding: 0 1rem 1rem;
      margin-bottom: 0;
      line-height: 3rem;
    }

    &_content {
      width: 100%;
      color: $base-text-color;
      text-align: center;
    }
  }

  .icon_balloon {
    width: 4rem;
    padding-top: 1rem;
    fill: $color-primary;
  }

  .icon_close {
    width: 2rem;
  }

  .icon_close_wrapper {
    position: absolute;
    top: -1rem;
    right: 1rem;
  }

  .btn_register {
     /deep/.app_button {
      background: $color-pink;
      color: $color-white;
      width: 15rem;
      padding: 1rem;
      font-size: 1.2rem;
      cursor: pointer;
    }
  }
</style>
