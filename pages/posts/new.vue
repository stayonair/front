<template>
  <div class="new__container">
    <div class="new">
      <main class="title__container">
        <textarea
          class="title"
          placeholder="タイトルを入力"
        />
        <input
          id="ref-image"
          type="file"
          multiple
          accept="image/jpeg, image/png"
        >
        <label
          for="ref-image"
          class="label-ef-image"
        >
          + サムネイルを画像設定する
        </label>
      </main>
      <div>
        <figure class="post__audio">
          <audio
            class="audio"
            controls
            preload="auto"
            :src="audioUrl"
          >
            <code>audio</code> element
          </audio>
        </figure>
      </div>
      <p>
        きょうのおはなし (最大 126 文字) <span class="necessary">必須</span>
      </p>

      <div class="text-editor__container">
        <div
          id="editor"
          class="text-editor"
        />
      </div>

      <div class="new_button__container">
        <app-button
          class="app_button cancel_button"
          text="CANCEL"
          color="gray"
          @click="handleClick"
        />
        <app-button
          class="app_button post_button"
          text="POST"
          color="yellow"
          @click="uploadPost"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from '~/components/Atoms/AppButton'
import EditorJS from '@editorjs/editorjs'
import { mapState } from 'vuex'

export default {
  components: {
    AppButton
  },
  data:() => ({
    editor: null
  }),
  computed: {
    ...mapState({
      audioUrl: store => store.post.audioUrl
    })
  },
  created() {
    this.editor = new EditorJS({ 
      holder: 'editor',
      data: {
        "blocks":[{"type":"paragraph","data":{"text":"無添加のシャボン玉石けんならもう安心！！"}},{"type":"paragraph","data":{"text":"天然の保湿成分が含まれるため、肌に潤いを与え、健やかに保ちます。"}},{"type":"paragraph","data":{"text":"お肌のことでお悩みの方は、ぜひ一度無添加シャボン玉石けんをお試しください。"}},{"type":"paragraph","data":{"text":"お求めは<b>0120-0055-95</b>まで。"}}]
      }
    })
  },
  methods: {
    uploadPost() {
      this.editor.save().then(data => {
        console.log(data)
        const rawPostData = JSON.stringify(data)
        console.log(rawPostData)
        // rawPostData を firebase にアップする
        this.$router.push('/news_feed')
      }).catch(error => {
        console.log(error)
      })
    },
    handleClick() {
      console.log('Clicked!!')
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
  background-color: #fff;
  display: inline-block;
  text-align: center;
  border-radius: 2rem;
  margin: 0 auto 2rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.title__container {
  display: flex;
  flex-direction: column;
  background-color: $button-gray;
  padding-top: 5rem;
  margin-bottom: 2rem;
}

.title {
  width: 80%;
  color: #ffffff;
  background-color: $gray-text-color;
  font-size: 18px;
  border: 2px dotted #ffffff;
  border-radius: 7px;
  margin: 0 auto 2rem;
  padding: 0.5rem;
}

.necessary {
  font-size: 0.8rem;
  color: $color-red;
  border: 1px solid $color-red;
  border-radius: 3px;
  padding: 0.2rem;
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

.app_button {
  /deep/ .app_button {
    width: 13rem;
  }
}

.post__audio {
  margin-bottom: 1rem;
  text-align: center;

  .audio {
    width: 80%;
  }
}

.text-editor__container {
  max-width: 62rem;
  margin: auto;
}

.text-editor {
  font-size: 1.4rem;
  color: $base-text-color;
  text-align: left;
  border: .1rem solid #ccc;
  border-radius: .3rem;
  padding: 2.4rem;
  margin: 0 1rem 1rem;
  /deep/ .codex-editor__redactor {
    min-height: 15rem;
    padding-bottom: 0 !important;
  }
  /deep/ .icon--bold {
    height: 14px;
  }
}

</style>
