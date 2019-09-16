<template>
  <div class="favorite__wrapper">
    <app-page-title 
      class="app_page_title"
      title="あとで聴くリスト"
    />
    <div>
      <div class="favorite__container">
        <div
          v-for="(item, key) in favoriteList"
          :key="key"
          class="favorite"
        >
          <div class="favorite__post">
            <div class="traveler__icon__wrapper">
              <img
                class="traveler__icon"
                :src="item.post.icon_url"
                alt="traveler_icon"
              >
            </div>
            <div class="favorite__post__wrapper">
              <p class="favorite__post_text favorite__post--title">
                {{ limitLengthOfText(item.title) }}
              </p>
              <p class="favorite__post_text favorite__post--date">
                {{ getPostedAt(item.updated_at) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import formatDateMixins from '~/mixins/formatDateMixins'
import AppPageTitle from '~/components/Atoms/AppPageTitle'

export default {
  layout: 'user',
  components: {
    AppPageTitle
  },
  mixins: [formatDateMixins],
  computed: {
    ...mapState({
      favoriteList: store => store.favorite.favoriteList
    }),
    limitLength() {
      return 17
    }
  },
  methods: {
    limitLengthOfText(text) {
      const dotForLongText = text.length > this.limitLength ? '...' : ''
      return text.slice(0, this.limitLength) + dotForLongText
    }
  }
}
</script>

<style scoped lang="scss">
.app_page_title {
  text-align: center;
  padding: 2rem 0 3rem;
}

.favorite__container {
  margin: 0 auto;
  max-width: 45rem;

  .favorite {
    display: flex;
    justify-content: space-between;
    padding: 1.5rem 3rem;
    
    .favorite__post {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &_text {
        font-size: 1.2rem;
        margin: 0;
        white-space: nowrap;
      }
    }
  }
}

.traveler__icon__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  width: 4rem;
  margin-right: 0.7rem;

  border: 0.1rem solid $gray-text-color;
  border-radius: 50%;

  .traveler__icon {
    width: 3rem;
  }
}
</style>