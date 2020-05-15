// Require needed modules
const express = require('express');
const db = require('../models')

// Declare router
const router = express.Router();

router.get('/', (req, res) => {
  // TODO: Replace stub route with page that renders list of all museums
  db.Museum.find()
  .then(museum => {
    res.render('museums/index',{museum});
  })
  .catch(err => {
    res.send(err)
  })
});

router.post('/', (req, res) => {
  // TODO: Replace stub route with page that renders form for adding new museum
  db.Museum.create(req.body)
  .then(() => {
    res.redirect('/museums')
  })
  .catch(err => {
    res.send(err)
  })
});

router.get('/new', (req, res) => {
  // TODO: Replace stub route with page that renders form for adding new museum
  res.render('museums/new');
});

router.get('/:id', (req, res) => {
  // TODO: Replace stub route with page that renders museum details
  //  and a list of pieces that musuem contains
  db.Museum.findById(req.params.id)
  .then(museum => {
    //going into pieces - and 
    db.Piece.find({museum:req.params.id})
    .then(piece => {
      res.render('museums/show',{museum, piece});
    })
    .catch(err => {
      console.log('inner catch',err)
      res.send(err)
    })
  })
  .catch(err => {
    res.send(err)
  })
});

module.exports = router;
