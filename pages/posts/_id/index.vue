<template>
  <div class="post__wrapper">
    <div class="post__container">
      <div class="post">
        <post-thumbnail
          :post="post"
          class="post_thumbnail"
        />
        <post-profile
          :icon-url="post.author.icon_url"
          :name="post.author.name"
          :posted-at="post.posted_at"
          class="post_profile"
        />
        <div class="episode-play__container">
          <div
            class="icon-play__container"
            @click="audioPlay"
          >
            <icon-play class="icon-play"/>
          </div>
          <p
            class="episode-play__text"
            @click="audioPlay"
          >
            Play Episode
          </p>
        </div>
        <div
          v-for="(doc , index) in post.article"
          :key="index"
          class="post__article"
        >
        <p v-html="doc.data.text" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '~/plugins/firebase'
import { mapState, mapActions } from 'vuex'
import PostThumbnail from '~/components/Molecules/PostThumbnail'
import PostProfile from '~/components/Atoms/PostProfile'
import IconPlay from '~/components/Atoms/Icons/IconPlay'

const postsCollection = db.collection('posts')

export default {
  name: 'Post',
  layout: 'user',
  components: {
    PostThumbnail,
    PostProfile,
    IconPlay
  },
  async asyncData({ params }) {
      return await postsCollection.doc(params.id).get()
        .then(doc => {
          const data = doc.data()
          const articleData = JSON.parse(data.article)
          data.article = articleData
          return  {
            post: data
          }
        })
  },
  computed: {
    ...mapState({
      audio: store => store.audio.audioData
    }),
  },
  methods: {
    ...mapActions('audio',['setAudioData', 'resetAudioData']),
    async audioPlay() {
      await this.setAudio()
    },
    async setAudio() {
      const data = {
        author: {
          name: this.post.author.name,
          icon_url: this.post.author.icon_url,
        },
        title: this.post.title,
        audio_url: this.post.audio_url
      }

      if (this.audio) {
        await this.resetAudio()
        this.setAudioData(data)
        return
      }

      this.setAudioData(data)
    },
    resetAudio() {
      this.resetAudioData()
    }
  }
}
</script>

<style lang="scss" scoped>
.post__container {
  background-color: $color-white;
  margin-bottom: 12rem;
}

.post_thumbnail /deep/ {
  margin-bottom: 3rem;

    @include mobile() {
      margin-bottom: 1.5rem;
    }

  .post_thumbnail__header__wrapper {
    padding: 8rem 10rem;

    @include tablet() {
      padding: 5rem;
    }
    @include mobile() {
      padding: 1.5rem;
    }

    .post_thumbnail__header__container {
      padding: 1rem 5rem;

      @include tablet() {
        padding: 0;
      }
      @include mobile() {
        padding: 0;
      }

      .post_thumbnail__header {
        &__tags {
          margin-bottom: 1rem;
        }

        @include mobile() {
          &__title {
            font-size: 2rem;
            font-weight: 200;
          }
        }
      }
    }
  }
}

.post_profile {
  padding-left: 10rem;

  @include mobile() {
    padding-left: 3rem;
  }
}

.post__article {
  padding: 0 5rem;
  font-size: 1.4rem;
  line-height: 3rem;
}

.post-audio__container {
  text-align: center;
  padding: 3rem 0;
}

// 仮再生ボタン
.episode-play__container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
}

.icon-play__container {
  position: relative;
  width: 4rem;
  height: 4rem;
  background-color: $button-gray;
  border-radius: 50%;
  margin-right: 1.4rem;
}

.icon-play {
  position: absolute;
  width: 2rem;
  fill: #fff;
  left: 30%;
}

.episode-play__text {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0
}
</style>
