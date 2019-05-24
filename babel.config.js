module.exports = {
  presets: [
    '@vue/app'
  ],
  // 配置此处配置后，vant才可以按需引入组件，并且不允许全部引入
  // 注意：如果不使用局部引入，则无法定制vant主题
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        // 自定义文件路径
        // 无效 `./src/styles/vant-theme.less`
        // 无效 `/src/styles/vant-theme.less`
        style: (name) => `${name}/style/less`
      },
      'vant'
    ]
  ]
}
