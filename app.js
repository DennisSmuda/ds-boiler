require('dotenv').config()

const path = require('path')
const express = require('express')
const errorhandler = require('errorhandler')
const logger = require('morgan')

const UAParser = require('ua-parser-js')

const app = express()
const port = 3000

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(errorhandler())
app.use(express.static(path.join(__dirname, 'public')))

/**
 * Middleware Locals
 * -> User Agent detection
 */
app.use((req, res, next) => {
  // User Agent
  const ua = UAParser(req.headers['user-agent'])

  res.locals.isDesktop = ua.device.type === undefined
  res.locals.isPhone = ua.device.type === 'mobile'
  res.locals.isTablet = ua.device.type === 'tablet'

  next()
})

/**
 * View Engine
 */
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

const handleRequest = () => {
  const meta = {
    title: 'Boilerplate',
    description: 'Description for this Boilerplate',
  }

  return {
    meta,
  }
}

/**
 * Routes
 */
app.get('/', (req, res) => {
  const defaults = handleRequest()

  res.render('pages/home', {
    ...defaults,
  })
})

app.get('/about', (req, res) => {
  const defaults = handleRequest()

  res.render('pages/about', {
    ...defaults,
  })
})

/**
 * Start Listening
 */
app.listen(port, () => {
  console.log(`Example app running at: http://localhost:${port}`)
})
