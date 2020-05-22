
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: "Beyond NPS - Team 19",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "Team 19 final DS4A App" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
    {src: '@/assets/scss/bnps.scss', lang: 'scss'},
  ],
  styleResources: {
    scss: [
      '@/assets/scss/_bnpsVars.scss',
    ]
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [{ src: '~plugins/vue-leaflet.js', ssr: false }],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    ['nuxt-buefy', {
      defaultIconPack: 'fas',
      materialDesignIconsHRef: "https://use.fontawesome.com/releases/v5.4.1/css/all.css"
    }],
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  env: {
    API: {
      HOST: (process.env.NODE_ENV === "development")?"http://localhost:8000":"http://3.16.156.207:8000"
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      if(process.env.NODE_ENV==="development"){
        config.devtool = ctx.isClient ? 'eval-source-map' : 'inline-source-map'
      }
    }
  }
}
