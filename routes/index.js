const express = require('express')
const cors = require('cors')
const router = express.Router()

// const apiKey = 'a346c460a81947d6913e56e30d2ca3b7'
// const withQuery = require('with-query')

const NewsAPI = require('newsapi')
const newsapi = new NewsAPI('a346c460a81947d6913e56e30d2ca3b7')

/* GET home pae. */
/* GET home pae. */
router.get('/', function (req, res, next) {
	newsapi.v2.topHeadlines({
		country: 'us'
	}).then((val) => {
		console.log(val)
		res.render('index', {title: 'Express', Headlines: val})
	})
})

module.exports = router
