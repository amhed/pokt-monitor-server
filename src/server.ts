import express, { Request, Response } from 'express'
import * as Sentry from '@sentry/node'

import path from 'path'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { settings } from './settings'
import { errorHandler } from './middleware/errorHandler'
import { configureViews } from './middleware/configureViews'
import { YoutubeVideo } from './entities/YoutubeVideo'
import { getRepository } from './helpers/DbContext'

// Init express
const app = express()

// Init Sentry
Sentry.init({
  dsn: settings.sentry.dsn,
  environment: settings.environment
})
app.use(Sentry.Handlers.requestHandler());

// Middleware
app.use(cors({ origin: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())

// Views
configureViews(app)

// Routes
app.get('/videos', async (req, res) => {
  const repo = await getRepository(YoutubeVideo)
  const allVideos = await repo.find()

  return res.send(allVideos)
})

// The Sentry error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler())
app.use(errorHandler)

export default app