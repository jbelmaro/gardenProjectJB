var app = require('express');
var router = app.Router();
var oauthserver = require('oauth2-server');

app.oauth = oauthserver({
	model: require('../model.js'),
	grants: ['password'],
	debug: true
});

/* GET home page. */
router.get('/', app.oauth.authorise(), function(err, req, res, next) {
      res.render('index', { title: 'Garden Project JB' }); 
      res.end();

});



module.exports = router;
