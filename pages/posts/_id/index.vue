<template>
  <div class="post__wrapper">
    <div class="post__container">
      <div class="post">
        <post-thumbnail
          :post="post"
          class="post__thumbnail"
        />
        <div class="post-audio__container">
          <audio :src="post.audio_url" controls/>
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
import { mapState } from 'vuex'
import PostThumbnail from '~/components/Molecules/PostThumbnail'

const postsCollection = db.collection('posts')

export default {
  name: 'Post',
  layout: 'user',
  components: {
    PostThumbnail
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
  }
}
</script>

<style lang="scss" scoped>
.post__container {
  background-color: $color-white;
}

.post__thumbnail /deep/ {
  margin-bottom: 3rem;

  .post_thumbnail__header__wrapper {
    padding: 8rem 10rem;

    @include tablet() {
      padding: 5rem;
    }
    @include mobile() {
      padding: 3rem 1rem 2rem;
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
        &__title {
          margin-bottom: 5rem;
        }

        &__tags {
          margin-bottom: 1rem;
        }

        @include mobile() {
          &__title {
            font-size: 2.5rem;
          }
        }
      }
    }
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

</style>
