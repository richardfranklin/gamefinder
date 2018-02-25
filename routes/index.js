var express = require('express');
var router = express.Router();
var url = require('url');

const igdb = require('igdb-api-node').default;
const client = igdb('49d456b4731b17fb88ac0cbe9f71ea5d');

router.get('/search', (req, res) => {

  var q = url.parse(req.url, true).query;

  client.games({
      filters: {
          'release_dates.date-gt': '2010-12-31',
          'release_dates.date-lt': '2012-01-01'
      },
      limit: 5,
      offset: 0,
      order: 'release_dates.date:desc',
      search: "sims"
  }, [
      'name',
      'release_dates.date',
      'rating',
      'hypes',
      'cover'
  ]).then(function(response){
  res.send({ express: response.body })
});


});

module.exports = router;
