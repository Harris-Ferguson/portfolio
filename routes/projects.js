var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

router.get('/', function(req, res, next) {
  fs.readFile(path.join(__dirname, '../public/text/projects.json'), (err, data) => {
    if(err){
      console.log(err);
      return;
    }
    var projects = JSON.parse(data.toString());
    res.render('projects', { projects: projects });
  })
});

module.exports = router;