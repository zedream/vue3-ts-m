const yaml = require('js-yaml')
const fs = require('fs')

module.exports = () => {
  let yml
  try {
    yml = yaml.load(fs.readFileSync('./app.yml', 'utf8'))
  } catch (e) {
    console.log(e)
  }
  const changeLog = yml.changeLog || []
  const releaseDate = yml.releaseDate || new Date()
  const historyChangeLog = yml.historyChangeLog || []
  return {
    'process.env.changeLog': JSON.stringify(changeLog),
    'process.env.releaseDate': JSON.stringify(releaseDate),
    'process.env.historyChangeLog': JSON.stringify(historyChangeLog)
  }
}
