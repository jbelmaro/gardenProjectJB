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
      console.error('ERROR GARDEN: ' + err.stack);
      res.send('/nodeGarden.js/login');
      next('/nodeGarden.js/login');
  } else {	  
      res.render('index', { title: 'Garden Project JB' }); 
  }
  res.end();
});

module.exports = router;
