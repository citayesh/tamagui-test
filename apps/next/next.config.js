/** @type {import('next').NextConfig} */
const { withTamagui } = require('@tamagui/next-plugin')
const { join, resolve } = require('node:path')

const boolVals = {
  true: true,
  false: false,
}

const disableExtraction =
  boolVals[process.env.DISABLE_EXTRACTION] ?? process.env.NODE_ENV === 'development'

const plugins = [
  withTamagui({
    config: '../../packages/config/src/tamagui.config.ts',
    components: ['tamagui', '@my/ui'],
    appDir: true,
    importsWhitelist: ['constants.js', 'colors.js'],
    outputCSS: process.env.NODE_ENV === 'production' ? './public/tamagui.css' : null,
    logTimings: true,
    disableExtraction,
    shouldExtract: (path) => {
      if (path.includes(join('packages', 'app'))) {
        return true
      }
    },
    disableThemesBundleOptimize: true,
    excludeReactNativeWebExports: ['Switch', 'ProgressBar', 'Picker', 'CheckBox', 'Touchable'],
  }),
]

module.exports = () => {
  /** @type {import('next').NextConfig} */
  let config = {
    typescript: {
      ignoreBuildErrors: true,
    },
    transpilePackages: [
      'solito',
      'react-native-web',
      'expo-linking',
      'expo-constants',
      'expo-modules-core',
    ],
    experimental: {
      scrollRestoration: true,
    },
    webpack: (webpackConfig) => {
      // Exclude SVG from default loader
      const fileLoaderRule = webpackConfig.module.rules.find(rule =>
        rule.test?.test?.('.svg')
      )
      if (fileLoaderRule) {
        fileLoaderRule.exclude = /\.svg$/i
      }

      // Add file-loader for SVG files (to import as URLs)
      webpackConfig.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        include: [
          resolve(__dirname, 'assets/svgs'),                  // local svgs folder
          resolve(__dirname, '../../packages/app/assets/svgs') // external svgs folder
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash].[ext]',
              outputPath: 'static/media',
              publicPath: '/_next/static/media',
              esModule: false,
            },
          },
        ],
      })

      return webpackConfig
    },
  }

  for (const plugin of plugins) {
    config = {
      ...config,
      ...plugin(config),
    }
  }

  return config
}
