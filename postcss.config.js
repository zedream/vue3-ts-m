const path = require('path')

module.exports = ({ file }) => {
  const viewportWidth = file.includes(path.join('node_modules', 'vant')) ? 375 : 750
  return {
    plugins: {
      "postcss-preset-env": {},
      "postcss-px-to-viewport": {
        viewportWidth,
        viewportUnit: 'vw',
        fontViewportUnit: "vw", // 字体使用的单位
        unitPrecision: 5, // 指定`px`转换为视窗单位值的小数位数
        // propList: [], // 暂时不需要转化
        selectorBlackList: [/^body$/, '.ignore-'], // 指定不需要转换的类
        exclude: [], // (Array or Regexp) 设置忽略文件，如node_modules
        minPixelValue: 1,
        mediaQuery: false // 允许在媒体查询中转换`px`
      }
    }
  }
}
