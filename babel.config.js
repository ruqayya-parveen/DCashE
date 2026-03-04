module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.ts',
          '.jsx',
          '.tsx',
          '.json',
        ],
        alias: {
          '@': './src',
          '@assets': './src/assets',
          '@screens': './src/screens',
          '@services': './src/services',
          '@components': './src/components',
          '@types': './src/types',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};