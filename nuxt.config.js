import pkg from './package'
require('dotenv').config()
const { APIKEY, AUTHDOMAIN, DATABASEURL, PROJECTID, STORAGEBUCKET, MESSAGINGSENDERID, APPID } = process.env

if (process.browser) {
  require('@editorjs/editorjs')
}

export default {
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    
    meta: [
      // 設定関連
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      //SEO関連
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: pkg.keywords
      },
      // ogp関連
      { hid: 'og:site_name', property: 'og:site_name', content: pkg.name },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:title', property: 'og:title', content: pkg.name },
      { hid: 'og:description', property: 'og:description', content: pkg.description },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Vibur&display=swap'
      },
      {
        rel: 'stylesheet',
        href:
          'href="https://fonts.googleapis.com/css?family=Unica+One&display=swap"'
      }
    ]
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/dotenv'
  ],

  workbox: {
    dev: true, // 開発環境でもPWAできるように
  },

  styleResources: {
    scss: [
      '~/assets/config/_var.scss',
      '~/assets/config/_typography.scss',
      '~/assets/config/_function.scss'
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['~/assets/basic.scss', '@fortawesome/fontawesome-free/css/all.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/vue-material',
    '~/plugins/firebase',
    '~/plugins/vue-drawer-layout',
    '~/plugins/sanitize-html'
  ],

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
  },

  manifest: {
    name: "StayOnAir",
    short_name: "StayOnAir",
    title: "StayOnAir",
    'og:title': 'StayOnAir',
    description: '旅人の体験や思い出を共有する、音声SNSです',
    'og:description': '旅人の体験や思い出を共有する、音声SNSです',
    lang: 'ja',
    theme_color: "#269EDD",
    background_color: "#FFF",
    display: "standalone",
    scope: "/",
    start_url: "/"
  },
  
  env: {
    APIKEY,
    AUTHDOMAIN,
    DATABASEURL,
    PROJECTID,
    STORAGEBUCKET,
    MESSAGINGSENDERID,
    APPID,
    baseUrl: process.env.BASE_URL || 'https://stayonair.jp/'
  },
  router: {
    middleware: ['authenticated']
  }
}
