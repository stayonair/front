<template>
  <div class="post__wrapper">
    <div class="post__container">
      <div class="post">
        <post-thumbnail
          :post="post"
          class="post_thumbnail"
          @playAudio="playAudio"
        />
        <div class="post_profile__container">
          <post-profile
            :icon-url="post.author.icon_url"
            :name="post.author.name"
            :posted-at="post.posted_at"
            class="post_profile"
          />
          <div class="icon_wrapper__container">
            <icon-wrapper
              class="icon_heart__container"
              :label="post.likes.length"
              @click="postLike(isLike(post.likes, authUid), post.id, authUid)"
            >
              <icon-heart
                class="icon_heart"
                :class="{'icon_heart--active': isLike(post.likes, authUid)}"
              />
            </icon-wrapper>
            <icon-wrapper
              class="icon_star__container"
              @click="addFavorite"
            >
              <icon-star
                class="icon_star"
                :class="{'icon_star--active': isFavorite()}"
              />
            </icon-wrapper>
          </div>
        </div>
        <div
          v-for="(doc , index) in post.article"
          :key="index"
          class="post__article"
        >
          <p>{{ $sanitize(doc.data.text) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase, { db } from '~/plugins/firebase'
import { mapState, mapActions } from 'vuex'
import PostProfile from '~/components/Atoms/PostProfile'
import PostThumbnail from '~/components/Molecules/PostThumbnail'

const postsCollection = db.collection('posts')

export default {
  name: 'Post',
  layout: 'user',
  components: {
    PostProfile,
    PostThumbnail,
    IconWrapper,
    IconHeart,
    IconStar
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
      audio: store => store.audio.audioData,
      authUid: store => store.auth.user.uid
    }),
  },
  methods: {
    ...mapActions('audio',['setAudioData', 'resetAudioData']),
    async playAudio() {
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
    },
    isLike(likes, uid) {
      return likes.some(_uid => {
        return uid === _uid
      })
    },
    isFavorite() {
      // お気に入りかどうか
      return false
    },
    postLike(isLike, postId, uid) {
      if (isLike) {
        postsCollection.doc(postId).update({
        likes: firebase.firestore.FieldValue.arrayRemove(uid)
      })
      .then(() => {
        this.post.likes = this.post.likes.filter(uid => uid !== this.authUid)
      })
        return
      }

      postsCollection.doc(postId).update({
        likes: firebase.firestore.FieldValue.arrayUnion(uid)
      })
      .then(() => {
        this.post.likes.push(this.authUid)
      })
    },
    addFavorite() {
      console.log('add favorite')
    }
  }
}
</script>

<style lang="scss" scoped>
.post__container {
  background-color: $color-white;
  margin-bottom: 12rem;
  height: 100%;
}

.post_thumbnail /deep/ {
  margin-bottom: 3rem;

    @include mobile() {
      margin-bottom: 1.5rem;
    }

  .post_thumbnail__header__wrapper {
    padding: 2rem 10rem 5rem;

    @include tablet() {
      padding: 3rem;
    }
    @include mobile() {
      padding: 1.5rem;
    }

    .post_thumbnail__header__container {
      max-width: 50rem;
      margin: 0 auto 3rem;
      padding: 5rem;

      @include tablet() {
        padding: 4rem;
        margin-bottom: 4rem;
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

.post_profile__container {
  display: flex;
  justify-content: space-between;
  padding: 0 32rem;
  margin-bottom: 2rem;

  @include mobile() {
    padding: 0 2rem;
    margin-bottom: 1rem
  }
}

.icon_wrapper__container {
    display: flex;
  }

.icon_heart__container {
  display: flex;
  align-items: center;
}

.icon_heart {
  &--active {
    fill: $color-pink;
  }
}

.icon_star {
  width: 2.4rem;
  /deep/ {
    .icon--star--outline {
      fill: $color-yellow;
    }
  }

  &--active {
    fill: $color-yellow;
  }
}

.post__article {
  margin: 4rem auto 0;
  padding: 0 5rem;
  max-width: 60rem;
  font-size: 1.4rem;
  line-height: 3rem;

  @include mobile {
    padding: 0 3rem;
  }
}

.post-audio__container {
  text-align: center;
  padding: 3rem 0;
}
</style>
