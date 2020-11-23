export default {

  mode: 'spa',

  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }
  },

  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''},
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap'
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#ccc'},
  /*
  ** Global CSS
  */
  css: [
    'view-design/dist/styles/iview.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~/plugins/api', ssr: false},
    {src: '~/plugins/iview', ssr: false}
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'
  ],
  /*
  ** Build configuration
  */
  build: {
    extend(config, ctx) {
      ctx.loaders.less.javascriptEnabled = true
    },
    cache: true,
  },

  generate: {
    fallback: true,
  },

  axios: {
    retry: false,
    baseURL: 'http://front-test.idalite.com/api/',
  }
}
