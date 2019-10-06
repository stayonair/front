<template>
  <div class="post-edit__container">
    <div class="post-edit">
      <main
        class="title__container"
        :style="getThumbnailImage"
      >
        <textarea
          v-model="post.title"
          class="title"
          placeholder="タイトルを編集"
        />
        <input
          id="ref-image"
          type="file"
          ref="file"
          multiple
          accept="image/jpeg, image/png"
          @change="inputImage"
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
            :src="post.audio_url"
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
          text="RETURN"
          color="gray"
          @click="handleClick"
        />
        <app-button
          class="app_button post_button"
          text="UPDATE"
          color="pink"
          @click="updatePost"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from '~/components/Atoms/AppButton'
import EditorJS from '@editorjs/editorjs'
import { mapState } from 'vuex'
import firebase, { db, storage } from '~/plugins/firebase'

const postsCollection = db.collection('posts')
const thumbnailStorageRef = storage.ref('thumbnails')

export default {
  components: {
    AppButton
  },
  async asyncData({ query }) {
    return await postsCollection.doc(query.id).get()
      .then(doc => {
        const data = doc.data()
        const articleData = JSON.parse(data.article)
        data.article = articleData
        return {
          post: data
        }
      })
  },
  data:() => ({
    editor: null,
    rawImageFile: null // アップロードする イメージファイル
  }),
  computed: {
    ...mapState({
      postId: store => store.post.postData.id,
      audioUrl: store => store.post.postData.audioUrl,
      auth: store => store.auth.user
    }),
    getThumbnailImage() {
      return `background-image: url(${this.post.thumbnail_photo_url})`
    }
  },
  created() {
    this.editor = new EditorJS({ 
      holder: 'editor',
      data: {
        'blocks': this.post.article
      }
    })
  },
  methods: {
    inputImage() {
      const imageFile = this.$refs.file.files[0]
      const imageUrl = window.URL.createObjectURL(imageFile)
      // アップロード用のファイルデータ
      this.rawImageFile = imageFile
      // 投稿ページ用のサムネイル画像URL
      this.post.thumbnail_photo_url = imageUrl

    },
    async uploadThumbnailImage(data) {
      const thumbnailRef = thumbnailStorageRef.child(this.post.id)
      await thumbnailRef.put(data).then(snapshot => {
        console.log(`upload success!!: ${snapshot.state}`)
      })
      await thumbnailRef.getDownloadURL().then(url => {
        this.post.thumbnail_photo_url = url
      })
    },
    async getArticleData() {
      await this.editor.save().then(data => {
        console.log(data)
        this.post.article = JSON.stringify(data.blocks)
      })
    },
    async updatePost() {

      // 1, サムネイル画像の変更があったら、ファイルをアップロードする
      if (this.rawImageFile) {
        await this.uploadThumbnailImage(this.rawImageFile)
      }

      // 2, Editor.js のデータを取得
      await this.getArticleData()

      // 3, ポストデータを Firebase にアップする
      db.collection('posts').doc(this.post.id).update(this.post)
      .then(() => {
        console.log(`update success!! post ID: ${this.post.id}`)
        // 今後マイポスト管理ページに遷移する
        this.$router.push('/my-posts')
      })
      .catch(e => {
        console.error(e)
      })
    },
    handleClick() {
      this.$router.push('/my-posts')
    }
  }
}
</script>

<style scoped lang="scss">
.post-edit__container {
  max-width: 1240px;
  text-align: center;
  color: $gray-text-color;
}

.post-edit {
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
  background-size: cover;
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
