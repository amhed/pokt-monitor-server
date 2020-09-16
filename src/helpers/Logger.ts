import { createLogger, transports, format } from 'winston'
import { settings } from '@settings'
const logDnaWinston = require('logdna-winston')

export const Logger = createLogger({ level: 'info' });

const consoleTransport = new transports.Console({
  format: format.combine(
    format.colorize(),
    format.simple()
  ),
})

Logger.add(consoleTransport)
Logger.add(new logDnaWinston(settings.logdna))