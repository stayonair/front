<template>
  <div class="search__wrapper">
    <div class="category_container">
      <div class="category">
        新着
        <div class="bottom-border hidden" />
      </div>
      <div class="category selected">
        検索
        <div class="bottom-border" />
      </div>
    </div>

    <div class="search-result__container">
      <div class="search__container">
        <icon-search class="icon-for-search" />
        <form class="search-form">
          <input
            class="search-detail"
            type="text"
            size="50" 
            placeholder="トラベラー・タグ・カテゴリ名で検索"
          >
        </form>
      </div>

      <div
        v-for="(post, key) in feedPosts"
        :key="key"
        class="searched"
        @click="goToPostPage(key)"
      >
        <post-thumbnail :post="post" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PostThumbnail from '~/components/Molecules/PostThumbnail'
import IconSearch from '~/components/Atoms/Icons/IconSearch'

export default {
  name: 'search',
  layout: 'user',
  components: {
    PostThumbnail,
    IconSearch
  },
  computed: {
    ...mapState({
      user: store => store.user.user,
      feedPosts: store => store.post.feedPosts,
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
.search__wrapper {
  margin-top: 1rem;
}

.category_container {
  display: flex;
  justify-content: center;
}

.category {
  width: 30Vw;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
  text-align: center;
  color: $dark-gray-text-color;
}

.selected {
  color: $color-brand;
}

.bottom-border {
  width: 30Vw;
  height: 0.4rem;
  background: $color-brand;
  border-radius: 3rem;
}

.hidden {
  display: none;
}

.search-form {
  margin: 0 auto;
  height: 2.3em;
  width: 80vw;
  line-height: 2.3em;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

.search-detail{
  font-size: 1.2rem;
  border: none;
  height: 2.0em;
  cursor: pointer;
}

.search-detail:focus {
  outline: 0;
}

.search-result__container {
  background: $color-white;

  .searched {
    width: 100%;
    height: auto;
    max-width: 50rem;
    max-height: 30rem;
    margin: 0 auto;
    box-shadow: inset 0 0 0 25rem rgba(0, 30, 40, 0.6);
    transition: all 0.4s;

    &:not(:last-child) {
      margin-bottom: 4rem;
    }

    &:hover {
      opacity: 0.8;
      transform: scale(0.99, 0.99);
    }
  }
}

.icon-for-search {
  stroke: $dark-gray-text-color;
  height: 2.3em;
  line-height: 2.3em;
  margin-right: 0.5rem;
}

.search__container {
  width: 80vw;
  border: 1px solid $gray-text-color;
  border-radius: 2rem;
  padding: 0 1rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 2rem;
}
</style>
