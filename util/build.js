const fs = require('fs-extra')
const childProcess = require('child_process')
const colors = require('colors')

try {
  // Remove current build
  fs.removeSync('./dist/')

  // Copy front-end files
  fs.copySync('./src/public', './dist/public')
  fs.copySync('./src/views', './dist/views')

  // Transpile typescript
  childProcess.spawn(
    './node_modules/.bin/tsc --build tsconfig.prod.json',
    { shell: true, stdio: 'inherit' }
  ).on('exit', err => {
    if (err) {
      console.log(colors.red('COMPLETED WITH ERRORS'))
    } else {
      console.log(colors.green('Transpilation Success!'))
    }
  })

} catch (err) {
  console.log(err)
}
