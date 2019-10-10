<template>
  <footer class="app_footer">
    <div class="footer__items__container">
      <ul class="footer__items">
        <li
          v-for="(buttonLink, index) in buttonLinks"
          :key="index"
          class="footer__item"
          :class="iconClasses(buttonLink)"
          @click="$router.push(buttonLink.path)"
        >
          <component :is="getComponent(buttonLink)" />
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
import IconBalloon from '~/components/Atoms/Icons/IconBalloon'
import IconRecord from '~/components/Atoms/Icons/IconRecord'
import IconStar from '~/components/Atoms/Icons/IconStar'

export default {
  components: {
    IconBalloon,
    IconRecord,
    IconStar
  },
  props: {
    path: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    buttons: ['balloon', 'record', 'star'],
    buttonLinks: [
      {
        icon: 'balloon',
        path: '/'
      },
      {
        icon: 'record',
        path: '/recording'
      },
      {
        icon: 'star',
        path: '/favorite'
      }
    ]
  }),
  methods: {
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
</style>
