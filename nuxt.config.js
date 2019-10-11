const envPath = `./config/.env.${process.env.ENV || 'local'}`
require('dotenv').config({ path: envPath })

const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
const baseDir = process.env.BASE_DIR || '/'
const basePath = baseUrl + baseDir

const lang = 'ja'
// title タグに入ります
const siteName = 'xxxxxxxxxxxxxxxxxxx'
// description タグに入ります
const siteDesc = 'xxxxxxxxxxxxxxxxxxx'

// images
const iconImages = baseDir + 'img/icon/'
const ogpImages = basePath + 'img/ogp/'

export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#',
      lang: lang
    },
    titleTemplate: `%s - ${siteName}`,
    meta: [
      // config
      { charset: 'utf-8' },
      { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'format-detection',
        content: 'telephone=no, email=no, address=no'
      },

      // seo
      {
        hid: 'description',
        name: 'description',
        content: siteDesc
      },

      // ogp
      { hid: 'og:site_name', property: 'og:site_name', content: siteName },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: basePath },
      { hid: 'og:title', property: 'og:title', content: siteName },
      {
        hid: 'og:description',
        property: 'og:description',
        content: siteDesc
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${ogpImages}home.png`
      },
      { name: 'twitter:card', content: 'summary_large_image' }
    ],
    link: [
      {
        rel: 'icon',
        sizes: '16x16',
        type: 'image/png',
        href: iconImages + 'favicon-16.png'
      },
      {
        rel: 'icon',
        sizes: '32x32',
        type: 'image/png',
        href: iconImages + 'favicon-32.png'
      },
      {
        rel: 'icon',
        sizes: '48x48',
        type: 'image/png',
        href: iconImages + 'favicon-48.png'
      },
      {
        rel: 'icon',
        sizes: '62x62',
        type: 'image/png',
        href: iconImages + 'favicon-62.png'
      },
      // apple touch icon
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: iconImages + 'apple-touch-icon.png'
      }
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/ress.css',
    '~/assets/scss/base.scss',
    'swiper/dist/css/swiper.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/anime',
    '~/plugins/lodash',
    { src: '~plugins/swiper', ssr: false }
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },

  styleResources: {
    scss: ['~/assets/scss/_variables.scss', '~/assets/scss/_mixin.scss']
  },
  pwa: {
    manifest: {
      name: 'PWATest',
      short_name: 'PWA',
      title: 'PWATest',
      'og:title': 'PWATest',
      description: 'PWATest',
      'og:description': 'PWATest',
      lang: 'ja',
      theme_color: '#ffffff',
      background_color: '#ffffff'
    }
  }
}
