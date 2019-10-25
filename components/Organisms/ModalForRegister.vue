<template>
  <div>
    <div 
      v-if="isModalOpened"
      class="mask"
      @click="isModalOpened = !isModalOpened"
    />
    <div>
      <div 
        class="modal"
        :class="isModalOpened ? 'modal--open' : 'modal--close'"
      >
        <div 
          class="icon_close_wrapper"
          @click="isModalOpened = !isModalOpened"
        >
          <icon-close class="icon_close" />
        </div>
        <div class="modal_attention_container">
          <div>
            <icon-balloon class="icon_balloon" />
          </div>
          <p class="modal_sentence">
            StayOnAir にユーザー登録すると、フォローやコメントをすることができます。
          </p>
          <app-button
            class="btn_register"
            text="ユーザー登録する"
            @click="$router.push('/signup')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconBalloon from '~/components/Atoms/Icons/IconBalloon'
import IconClose from '~/components/Atoms/Icons/IconClose'
import AppButton from '~/components/Atoms/AppButton'

export default {
  name: 'ModalForRegister',
  layout: 'user',  
  components: {
    IconBalloon,
    IconClose,
    AppButton
  },
  data: () => ({
    isModalOpened: false,
  }),
}

</script>

<style scoped lang="scss">
  .modal_wrapper {
    position: relative;
    z-index: 13;

  }

  .modal_attention_container {
    width: 100%;
    color: $base-text-color;
    text-align: center;
  }

  .icon_balloon {
    width: 4rem;
    padding-top: 1rem;
    fill: $color-primary;
  }

  .modal_sentence {
    padding: 1rem;
    margin-bottom: 0;
  }

  .mask {
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    z-index: 1;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }

  .modal {
    width: 100%;
    position: fixed;
    top: 30%;
    left: 9%;
    z-index: 13;
    width: 80%;
    background: $color-white;
    padding: 2.5rem;
    letter-spacing: .5px;
    border-radius: 7px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
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

  .icon_close {
    width: 2rem;
  }

  .icon_close_wrapper {
    position: absolute;
    top: 7px;
    right: 7px;
  }

  .modal--open {
    display: block;
  }

  .modal--close {
    display: none;
  }
</style>