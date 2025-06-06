/**
 * @type {import('expo/metro-config')}
 */
const { getDefaultConfig } = require('@expo/metro-config')
const path = require('node:path')

const projectRoot = __dirname
const workspaceRoot = path.resolve(projectRoot, '../..')

const config = getDefaultConfig(projectRoot)

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot]

// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
]

// 3. Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
config.resolver.disableHierarchicalLookup = true

// 4. Configure SVG support using react-native-svg-transformer:
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
  unstable_allowRequireContext: true,
  minifierPath: require.resolve('metro-minify-terser'),
}

// 5. Remove svg from assetExts and add it to sourceExts
const { assetExts, sourceExts } = config.resolver
config.resolver.assetExts = assetExts.filter(ext => ext !== 'svg')
config.resolver.sourceExts = [...sourceExts, 'svg']

module.exports = config
