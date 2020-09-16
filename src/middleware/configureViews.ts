import express, { Express } from 'express'
import exphbs from 'express-handlebars'
import path from 'path'

export const configureViews = (app: Express) => {
  const viewsDir = path.join(__dirname, '../views')
  app.set('views', viewsDir)
  app.engine('html', exphbs())
  app.set('view engine', 'html')
}