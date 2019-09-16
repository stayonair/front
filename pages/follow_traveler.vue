<template>
  <div class="follow_traveler__wrapper">
    <app-page-title 
      class="app_page_title"
      title="フォロートラベラー一覧"
    />
    <div class="follow_traveler__container">
      <div
        v-for="(traveler, key) in travelers"
        :key="key"
        class="follow_traveler"
      >
        <div class="follow_traveler__profile">
          <div class="follow_traveler__icon__wrapper">
            <img
              class="follow_traveler__icon"
              :src="traveler.icon_url"
              alt="traveler_icon"
            >
          </div>

          <div class="follow_traveler__profile__wrapper">
            <p class="follow_traveler__profile_text follow_traveler__profile--name">
              @{{ traveler.name }}
            </p>
            <p class="follow_traveler__profile_text follow_traveler__profile--date">
              Last updated {{ getPostedAt(traveler.updated_at) }}
            </p>
          </div>
        </div>
        <font-awesome-icon-button
          class="app_icon--cross"
          awesome-icon="fa-times-circle"
          color="red"
          @click="unfollowTraveler()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import formatDateMixins from '~/mixins/formatDateMixins'
import AppPageTitle from '~/components/Atoms/AppPageTitle'
import FontAwesomeIconButton from '~/components/Molecules/FontAwesomeIconButton'

export default {
  layout: 'user',
  components: {
    FontAwesomeIconButton,
    AppPageTitle
  },
  mixins: [formatDateMixins],
  computed: {
    ...mapState({
      travelers: store => store.traveler.travelers
    })
  },
  methods: {
    unfollowTraveler() {
      console.log("unfollow")
    }
  }
}
</script>

<style scoped lang="scss">
.app_page_title {
  text-align: center;
  padding: 2rem 0 3rem;
}

.follow_traveler__container {
  padding: 0 4rem;
  margin: 0 auto;
  max-width: 45rem;

  .follow_traveler {
    display: flex;
    justify-content: space-between;
    padding: 1.5rem 0;

    .follow_traveler__profile {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &--name {
        font-size: 2rem;
      }

      &--date {
        font-size: 1.2rem;
      }
    }

    .follow_traveler__profile_text {
      margin: 0;
    }

    .follow_traveler__icon__wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 4rem;
      width: 4rem;
      margin-right: 0.7rem;

      border: 0.1rem solid $gray-text-color;
      border-radius: 50%;

      .follow_traveler__icon {
        width: 3rem;
      }
    }
  }
}
</style>