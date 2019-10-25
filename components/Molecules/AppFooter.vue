<template>
  <footer class="app_footer">
    <registration-modal
      v-if="isModalOpened"
      @hiddenModal="isModalOpened = false"
    />
    <div class="footer__items__container">
      <ul class="footer__items">
        <li
          v-for="(buttonLink, index) in buttonLinks"
          :key="index"
          class="footer__item"
          :class="iconClasses(buttonLink)"
          @click="checkAuthPushPath(buttonLink)"
        >
          <component :is="getComponent(buttonLink)" />
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex'
import IconBalloon from '~/components/Atoms/Icons/IconBalloon'
import IconRecord from '~/components/Atoms/Icons/IconRecord'
import IconStar from '~/components/Atoms/Icons/IconStar'
import RegistrationModal from '~/components/Organisms/RegistrationModal'

export default {
  components: {
    IconBalloon,
    IconRecord,
    IconStar,
    RegistrationModal
  },
  props: {
    path: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    isModalOpened: false,
    buttons: ['balloon', 'record', 'star'],
    buttonLinks: [
      {
        icon: 'balloon',
        path: '/',
        isGeneralPage: true
      },
      {
        icon: 'record',
        path: '/recording',
        isGeneralPage: false
      },
      {
        icon: 'star',
        path: '/favorite',
        isGeneralPage: false
      }
    ]
  }),
  computed: {
    ...mapState({
      auth: store => store.auth.user
    })
  },
  methods: {
    checkAuthPushPath(buttonLink) {
      this.isModalOpened = false
      if (buttonLink.isGeneralPage) {
        this.$router.push(buttonLink.path)
      } else if (!this.auth) {
        this.isModalOpened = true
        return
      } else {
        this.$router.push(buttonLink.path)
      }
    },
    getComponent(buttonLink) {
      return 'icon-' + buttonLink.icon
    },
    iconClasses(buttonLink) {
      if (this.path === buttonLink.path) {
        return { is_path: true }
      }
      return {}
    }
  }
}
</script>

<style scoped lang="scss">
.footer__items {
  display: flex;
  justify-content: space-around;

  .footer__item {
    list-style: none;

    &.is_path {
      /deep/ {
        .icon {
          &--balloon {
            fill: $color-primary;
          }
          &--star-shape {
            fill: $color-primary;
          }
        }
      }
    }

    /deep/ {
      .icon {
        &--balloon,
        &--record {
          height: 3rem;
          width: 3rem;
          fill: $dark-gray-text-color;
        }
      }

      .icon--record {
          fill: $color-white;
          background-color: $color-pink;
          border-radius: 50%;
          padding: 0.9rem;
          width: 5rem;
          height: 5rem;
          margin-bottom: 0.5rem;
        }

      .icon--star {
        height: 3rem;
        width: 3rem;
        fill: none;
      }
      
      .icon--star-shape {
        fill: $dark-gray-text-color;
      }
    }
  }
}

.modal--open {
  display: block;
}

.modal--close {
  display: none;
}
</style>
