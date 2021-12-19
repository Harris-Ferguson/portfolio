var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Harris Ferguson' });
});

router.get('/about', function(req, res, next) {
  fs.readFile(path.join(__dirname, '../public/text/about.txt'), (err, data) => {
    if(err){
      console.log(err);
      return;
    }
    res.render('about', {about: data, img: '/images/pfp.jpg'});
  });
});

router.get('/canvas', function(req, res, next) {
  res.sendFile('./canvas.js');
});

module.exports = router;
