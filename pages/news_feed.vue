<template>
  <div class="news-feed-post__wrapper">
    <div class="news-feed-post__container">
      <div 
        v-for="post in feedPosts"
        :key="post.id"
        :style="`background-image: url(${post.thumbnail_photo_url});`"
        class="news-feed-post"
      >
        <div class="news-feed-post__text__wrapper"> 
          <h2 class="news-feed-post__title">
            {{ post.title }}
          </h2>
        
          <div class="news-feed-post__tags">
            <span
              v-for="(tag, tagIndex) in post.tags"
              :key="tagIndex"
              class="news-feed-post__tag"
            >
              #{{ tag }}
            </span>
          </div>
        </div>

        <div class="news-feed-post__status">
          <div class="news-feed-post__author">
            <img 
              :src="post.author.icon_url" 
              class="news-feed-post__author_icon"
              alt="icon_url"
            >
            <span class="news-feed-post__author_name">
              @{{ post.author.name }}
            </span>
            <span class="news-feed-post__posted_at">
              {{ getPostedAt(post.posted_at) }}
            </span>
          </div>
          <div class="news-feed-post__like">
            <heart-icon class="icon__heart" />
            <span class="news-feed-post__like_number">
              {{ post.like || '' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsFeed',
  data: () => {
    return {
      feedPosts: [
        {
          id: 1,
          author: {
            id: 1,
            name: 'nao',
            twitter_id: 'nayo',
            icon_url: 'https://image.flaticon.com/icons/svg/1808/1808676.svg'
          },
          title: 'タスマニアでアルパカに遭遇した話',
          tags: ['オーストラリア', 'タスマニア', '夫婦旅'],
          like: 3,
          thumbnail_photo_url: 'https://images.unsplash.com/photo-1503474529892-45c618831f14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80',
          posted_at: '2019-06-09 00:00:00'
        },
        {
          id: 2,
          author: {
            id: 1,
            name: 'nao',
            twitter_id: 'nayo',
            icon_url: 'https://image.flaticon.com/icons/svg/1808/1808676.svg'
          },
          title: 'KLのチャイナタウンで酸っぱい麺食べた話',
          tags: ['アジア旅', 'マレーシア', '夫婦旅'],
          like: 0,
          thumbnail_photo_url: 'https://images.unsplash.com/photo-1531066222101-a54ff2e86da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
          posted_at: '2019-06-08 20:00:00'
        },
        {
          id: 3,
          author: {
            id: 2,
            name: 'Shohei',
            twitter_id: 'show60',
            icon_url: 'https://image.flaticon.com/icons/svg/1864/1864593.svg'
          },
          title: 'ベトナム ハノイからホーチミンまで縦断バス旅行',
          tags: ['アジア旅', 'ベトナム', '夫婦旅'],
          like: 2,
          thumbnail_photo_url: 'https://images.unsplash.com/photo-1554317240-64f830425c51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
          posted_at: '2019-05-08 00:00:00'
        }
      ]
    }
  },
  methods: {
    getPostedAt(postedAt) {
      const date = new Date(postedAt.replace(/-/g, '-'))
      const timeDiff = Math.floor((new Date() - date) / 3600000)
      const dateDiff = Math.floor(timeDiff / 24)

      console.log(date, timeDiff, dateDiff)
      if (dateDiff === 0) { // 24 時間以内
        return `${timeDiff} hour${timeDiff > 1 ? 's' : ''} ago`
      }
      if (dateDiff > 30) { // 1 月以上前
        return `${date.getFullYear()} / ${date.getMonth()+1} / ${date.getDate()}`
      }
      return `${dateDiff} day${dateDiff > 1 ? 's' : ''} ago`
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/feed.scss";
</style>