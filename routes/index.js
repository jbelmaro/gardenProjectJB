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
  if(err) {
      console.error('ERROR GARDEN: ' + err.status + " " + err.stack);
      res.redirect('/nodeGarden.js/login');
      res.end();

  } else {	  
      res.render('index', { title: 'Garden Project JB' }); 
      res.end();
      next();
  }
});

module.exports = router;
