// Require needed modules
const express = require('express');
let db = require('../models')


// Declare router
const router = express.Router();

router.get('/', (req, res) => {
    db.Piece.find()
    .populate('museum')
    .then((piece) => {
      res.render('pieces/index', {piece})
    })
    .catch(err => {
      res.send(err)
    })
    })

    

router.post('/', (req, res) => {
  // TODO: Replace stub route with page that renders form for adding new piece
  req.body.creator = {
    firstname: req.body.firstname,
    lastname:req.body.lastname,
    image:req.body.currentImage,
    birthyear: req.body.birthyear,
    deathyear: req.body.deathyear
  }
  db.Piece.create(req.body)
  .then(()=> {
    res.redirect('/')
  })
  .catch(err=> {
    res.send(err)
  })

})


router.get('/new', (req, res) => {
  // TODO: Replace stub route with page that renders form for adding new piece
  db.Piece.find()
  .then((piece) => {
    db.Museum.find()
    .then(museum => {
      res.render('pieces/new', {piece, museum});
    })
    .catch(err=> {
      res.send(err)
    })
  })
  .catch(err => {
    res.send(err)
  })
});

router.get('/:id', (req, res) => {
  // TODO: Replace stub route with page that renders piece details
  //  and all the info about it's creator and the museum it's located in
  db.Piece.findById(req.params.id)
  .populate('museum')
  .then((piece) => {
    res.render('pieces/show', { piece })
  })
  .catch(err => {
    res.send(err)
  })
})

router.get('/edit/:id', (req, res) => {
  db.Piece.findById(req.params.id)
  .then(piece => {
    db.Museum.find()
    .then(museum => {
      res.render('pieces/edit', {piece, museum})
    })
    .catch(err => {
      res.send(err)
    })
  })
  .catch(err => {
    res.send(err)
  })
})

router.put('/:id', (req, res) => {
  req.body.creator = {
    firstname: req.body.firstname,
    lastname:req.body.lastname,
    image:req.body.creatorImage,
    birthday: req.body.birthyear,
    death: req.body.deathyear
  }
  db.Piece.findByIdAndUpdate({_id: req.params.id}, {$set:req.body}, {upsert: true})
  .then(() => {
    res.redirect('/pieces/' + req.params.id)
  })
  .catch(err => {
    console.log('errrorrrr', err)
    res.send(err)
  })
})

module.exports = router;
