module.exports = {
	'extends': 'standard',
	root: true,
	parserOptions: {
		sourceType: 'module'
	},
	env: {
		browser: true,
		node: true,
		es6: true
	},
	rules: {
		// allow async-await
		'generator-star-spacing': 'off',
		'indent': [2, 'tab'],
		'no-tabs': 0,
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
	}
}
