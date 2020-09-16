import { ConnectionOptions } from 'typeorm'
const ormConfig = require('../ormconfig.js')
export type EnvironmentName = 'development' | 'staging' | 'production'

interface SettingsSchema {
  environment: EnvironmentName
  ormConfig: ConnectionOptions
  sentry: {
    dsn: string
  }
  logdna: {
    key: string
    hostname: string
    env: EnvironmentName
    level: string
    index_meta: boolean
    handleExceptions: boolean
  }
}

export const settings: SettingsSchema = {
  environment: process.env.NODE_ENV as EnvironmentName,
  ormConfig,
  sentry: {
    dsn: process.env.NODESTACK_SENTRY_DSN as string
  },
  logdna: {
    key: process.env.NODESTACK_LOGDNA_KEY!,
    hostname: process.env.NODESTACK_HOSTNAME || 'localhost',
    env: (process.env.NODE_ENV || 'development') as EnvironmentName,
    level: 'debug', // Default to debug, maximum level of log, doc: https://github.com/winstonjs/winston#logging-levels
    index_meta: true, // Defaults to false, when true ensures meta object will be searchable
    handleExceptions: true // Only add this line in order to track exceptions
  }
}