var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

router.get('/', (req, res, next) => {
  fs.readFile(path.join(__dirname, '../public/text/jobs.json'), (err, data) => {
    if(err){
      console.log(err);
      return;
    }
    const jobs = JSON.parse(data.toString());
    res.render('work', { jobs: jobs });
  })
});

module.exports = router;