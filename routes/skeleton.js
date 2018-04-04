const express = require('express')
const router = express.Router()

/* GET home pae. */
/* GET home pae. */
router.get('/', function (req, res, next) {
	res.render('index', {title: 'Express'})
})

module.exports = router
