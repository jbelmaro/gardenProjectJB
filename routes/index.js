var app = require('express');
var router = app.Router();
var oauthserver = require('oauth2-server');

app.oauth = oauthserver({
	model: require('../model.js'),
	grants: ['password'],
	debug: true
});

/* GET home page. */
router.get('/', app.oauth.authorise(), function(req, res, next) {
  res.render('index', { title: 'Garden Project JB' });
  res.end();
  res.redirect(400, '/nodeGarden.js/login');
});

module.exports = router;
