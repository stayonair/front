<template>
  <div>
    <div class="mask" />
    <div class="modal" />
    <div class="modal_attention_container">
      <div>
        <icon-balloon class="icon_balloon"/>
      </div>
      <p class="modal_sentence">
        StayOnAir にユーザー登録すると、フォローやコメントをすることができます。
      </p>
        <app-button
          class="btn_register"
          @click="$router.push('/signup')"
          text="ユーザー登録する"
        />
    </div>
  </div>
</template>

<script>
import IconBalloon from '~/components/Atoms/Icons/IconBalloon'
import AppButton from '~/components/Atoms/AppButton'

export default {
  name: 'ModalForRegister',
  layout: 'user',  
  components: {
    IconBalloon,
    AppButton
  }
}

</script>

<style scoped lang="scss">
  .modal_attention_container {
    width: 100%;
    color: black;
    text-align: center;
  }

  .icon_balloon {
    width: 4rem;
    padding: 0;
    fill: $color-primary;
  }

  .modal_sentence {
    padding: 1rem;
    margin-bottom: 0;
  }

  .mask {
    // background: rgba(0, 0, 0, 0.4);
    // position: fixed;
    // z-index: 9998;
    // top: 0;
    // bottom: 0;
    // right: 0;
    // left: 0;
  }

  .modal {
    // width: 100%;
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