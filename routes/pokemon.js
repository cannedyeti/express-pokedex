var express = require('express');
var router = express.Router();
var db = require('../models')

// GET - return a page with favorited Pokemon
router.get('/', function(req, res) {
	db.favorite.findAll().then(function(favorites) {
		res.render('favorites', {favorites: favorites})
	}).catch(function(error) {
		res.status(404).send("fk");
	}) 
});

// POST - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
	console.log(req.body);
  	db.favorite.create(req.body)
  	.then(function(index) {
  		res.redirect('./favorites');
  })
});

router.delete('/:name', function(req, res) {
	db.favorite.destroy({
		where: {
			name: req.params.name
		}
	}).then(function() {
		res.send({message: 'did it boi' });
	})
})


module.exports = router;
