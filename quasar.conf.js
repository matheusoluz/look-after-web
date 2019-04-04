
// Configuration for your app

module.exports = function (ctx) {
  return {
    plugins: [
      'i18n',
      'axios',
      'vuelidate',
      'vue-acl'
    ],
    css: ['app.styl'],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons',
      'fontawesome',
      'mdi'
    ],
    supportIE: false,
    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      distDir: '../look-after-api/client',
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        })
      },
      env: ctx.dev
        ? { API: JSON.stringify('/api') }
        : { API: JSON.stringify('../api') }
    },
    devServer: {
      port: 8000,
      open: true,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:3000',
          changeOrigin: true
        }
      }
    },
    framework: {
      components: [
        'QLayout',
        'QLayoutHeader',
        'QLayoutDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QTabs',
        'QTab',
        'QTable',
        'QTd',
        'QTr',
        'QChip',
        'QTooltip',
        'QBtnGroup',
        'QSelect',
        'QCard',
        'QCardActions',
        'QCardMain',
        'QCardSeparator',
        'QCardTitle',
        'QSearch',
        'QModal',
        'QField',
        'QInput',
        'QToggle',
        'QList',
        'QListHeader',
        'QItem',
        'QItemMain',
        'QItemSide',
        'QItemTile',
        'QScrollArea'
      ],
      directives: [
        'Ripple',
        'CloseOverlay'
      ],
      plugins: [
        'Notify',
        'Loading',
        'LocalStorage',
        'Dialog',
        'Screen',
        'AddressbarColor'
      ]
    },
    // animations: 'all', // --- includes all animations
    animations: [],
    ssr: {
      pwa: false
    }
  }
}
