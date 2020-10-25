
export default {
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=2.0, minimum-scale=1.0' },
      { name: '"mobile-web-app-capable', content: 'yes' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  loading: { color: '#fff' },

  buildModules: [
    '@nuxtjs/pwa',
  ],

  pwa: {
    manifest: {
      name: 'My Awesome Todo List App',
      lang: 'en',
      display: 'fullscreen',  
      orientation: 'portrait'
    }
  }
}
