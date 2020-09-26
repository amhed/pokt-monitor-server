import app from './server'
import { Logger } from './helpers/Logger'

const port = Number(process.env.PORT || 3000)
app.listen(port, () => {
  Logger.info('Express server started on port: ' + port)
})
