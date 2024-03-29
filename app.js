const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const sassMiddleware = require('node-sass-middleware')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
// const bodyParser = require('body-parser')
const cors = require('cors')

//  Express Routes
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const skeletonRouter = require('./routes/skeleton')

const app = express()

//  Webpack-dev-middleware
const config = require('./webpack.dev.js')
const compiler = webpack(config)
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(webpackDevMiddleware(compiler, {
	publicPath: config.output.publicPath
}))
app.use(require('webpack-hot-middleware')(compiler))

app.use(logger('combined'))
app.use(cors())
app.use(express.json())
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(sassMiddleware({
	src: path.join(__dirname, 'public'),
	dest: path.join(__dirname, 'public'),
	indentedSyntax: false, // true = .sass and false = .scss
	sourceMap: true
}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/skeleton', skeletonRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render('error')
})

module.exports = app
