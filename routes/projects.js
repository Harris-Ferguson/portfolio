var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  let projects = 
  [
    {
      name: "First", 
      description: "hehe"
    },
    {
      name: "Second", 
      description: "hoho"
    }
  ]
  console.log(projects);
  res.render('projects', { projects: projects });
});

module.exports = router;