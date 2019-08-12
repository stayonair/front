<template>
  <div class="new__container">
    <div class="new">
      <main class="title__container">
        <textarea class="title" placeholder="タイトルを入力"></textarea>
        <input
          id="ref-image"
          type="file"
          multiple accept="image/jpeg, image/png"
        >
        <label for="ref-image" class="label-ef-image"> + サムネイルを画像設定する</label>
      </main>
      <div>
        <figure class="post__audio">
          <audio
            class="audio"
            controls
            preload="auto"
            src="http://www.voice-pro.jp/announce/mp3/001-sibutomo.mp3"
          >
            <code>audio</code> element
          </audio>
        </figure>
      </div>
      <p>きょうのおはなし ( 最大 126 文字 )  <span class="necessary">必須</span></p>
      <textarea class="new_text" name="" id="" cols="30" rows="10"></textarea>
      <div class="new_button__container">
        <app-button
          class="cancel_button"
          text="CANCEL"
          color="gray"
          @click="handleClick"
        />
        <app-button
          text="POST"
          color="yellow"
          @click="handleClick"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from '~/components/Atoms/AppButton'

export default {
  components: {
    AppButton
  },
  methods: {
    handleClick() {
      console.log('clicked!')
    }
  }
}
</script>

<style scoped lang="scss">
  .new__container {
    max-width: 1240px;
    text-align: center;
    color: $gray-text-color;
  }

  .new {
    width: 100%;
  }

  #ref-image {
    display: none;
  }

  .label-ef-image {
    margin: 0 auto;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    margin-bottom: 2rem;
    background-color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
  }

  .title__container {
    padding-top: 5rem;
    background-color: $button-gray;
    margin-bottom: 2rem;
  }

  .title {
    width: 80%;
    color: #ffffff;
    margin: 0 auto;
    background-color: $gray-text-color;
    font-size: 18px;
    border: 2px dotted #ffffff;
    border-radius: 7px;
    margin-bottom: 2rem;
  }

  .necessary {
    font-size: 0.8rem;
    padding: 0.2rem;
    color: $color-red;
    border: 1px solid $color-red;
    border-radius: 3px;
  }

  .new_text {
    width: 80%;
    background-color: $black-background-text;
    border: none;
    border-radius: 4px;
    margin-bottom: 2rem;
  }

  .new_button__container {
    display: flex;
    justify-content: center;
    border-top: 1px solid $gray-text-color;
    padding-top: 2rem;
  }

  .cancel_button {
    margin-right: 2rem;
  }

  .post__audio {
  margin-bottom: 1rem;
  text-align: center;

    .audio {
      width: 80%;
    }
  }
</style>
