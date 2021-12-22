var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile(path.join(__dirname, '../public/text/index.txt'), (err, data) =>{
    if(err){
      console.log(err);
      return;
    }
    res.render('index', { title: 'Hi 👋, I\'m Harris', content:  data});
  })
});

router.get('/about', function(req, res, next) {
  fs.readFile(path.join(__dirname, '../public/text/about.txt'), (err, data) => {
    if(err){
      console.log(err);
      return;
    }
    res.render('about', {about: data, img: '/images/headshot.jpg'});
  });
});

router.get('/canvas', function(req, res, next) {
  res.sendFile('./canvas.js');
});

router.get('/cargame', function(req, res, next) {
  res.sendFile('/cargame/index.html');
})

module.exports = router;
