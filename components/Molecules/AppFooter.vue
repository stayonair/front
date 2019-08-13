<template>
  <footer class="app_footer">
    <div class="footer__items__container">
      <ul class="footer__items">
        <li
          v-for="(buttonLink, index) in buttonLinks"
          :key="index"
          class="footer__item"
          :class="iconClasses(buttonLink)"
        >
          <component 
            :is="getComponent(buttonLink)"
          />
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
import IconUser from '~/components/Atoms/Icons/IconUser'
import IconBalloon from '~/components/Atoms/Icons/IconBalloon'
import IconBell from '~/components/Atoms/Icons/IconBell'

export default {
  components: {
    IconUser,
    IconBalloon,
    IconBell
  },
  props: {
    path: {
      type: String,
      default: ''
    }
  },
  data:() => ({
    buttons: ['user', 'balloon', 'bell'],
    buttonLinks: [
      {
        icon: 'user',
        link: 'my_page'
      },
      {
        icon: 'balloon',
        link: 'news_feed'
      },
      {
        icon: 'bell',
        link: 'notice'
      }
    ]
  }),
  methods: {
    getComponent(buttonLink) {
      return 'icon-' + buttonLink.icon
    },
    iconClasses(buttonLink) {
      if (this.path.includes(buttonLink.link)) {
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
          &--bell,
          &--user,
          &--balloon {
            fill: $color-primary;
          }
        }
      }
    }

    /deep/ {
      .icon {
        &--bell,
        &--user,
        &--balloon {
          height: 3rem;
          width: 3rem;
          fill: $dark-gray-text-color;
        }
      }
    }
  }
}
</style>
