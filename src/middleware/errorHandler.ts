import { Request, Response } from 'express'
import HttpStatusCodes from 'http-status-codes'

import { settings } from '@settings'
import { Logger } from '@helpers/Logger'

export function errorHandler(
  err: Error, 
  req: Request, 
  res: Response, 
  next: (err?: Error) => void
): void {
  // Only show stack trace on local dev machines
  if (settings.environment === 'development') {
    const { message, stack } = err
    if (res.headersSent) {
      next(err)
      return
    }

    const errorInfo = {
      status: 'error',
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      message,
      stack
    }
    Logger.error(message, errorInfo)

    res.render('internal-error.html', errorInfo)
    return
  }

  if (res.headersSent) {
    next(err)
    return
  }
  Logger.error(err)
  res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR)
}
