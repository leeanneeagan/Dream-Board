// app/routes.js
const { ObjectId } = require('mongodb');

module.exports = function(app, passport, db) {

  app.get('/', function(req, res) {
    res.render('index.ejs');
  });

  
  app.get('/profile', isLoggedIn, function(req, res) {
    db.collection('messages').find().toArray((err, messages) => {
      if (err) return console.log(err)
     
      db.collection('dreams').find({ userId: req.user._id }).toArray((err, dreams) => {
        if (err) return console.log(err)
        res.render('profile.ejs', {
          user: req.user,
          messages: messages || [],
          dreams: dreams || []
        })
      })
    })
  });

  app.get('/logout', function(req, res) {
    req.logout(() => {
      console.log('User has logged out!')
    });
    res.redirect('/');
  });

  // GET all dreams for logged in user
  app.get('/dreams', isLoggedIn, (req, res) => {
    db.collection('dreams').find({ userId: req.user._id }).toArray((err, result) => {
      if (err) return console.log(err)
      res.render('profile.ejs', {
        user: req.user,
        dreams: result
      })
    })
  });

  // POST new dream
  app.post('/dreams', isLoggedIn, (req, res) => {
    db.collection('dreams').insertOne(
      {
        title: req.body.title,
        content: req.body.content,
        mood: req.body.mood || '',
        userId: req.user._id,
        createdAt: new Date()
      },
      (err, result) => {
        if (err) return console.log(err)
        console.log('Dream saved to database')
        res.redirect('/profile')
      }
    )
  });

  // PUT (update) dream
  app.put('/dreams/:id', isLoggedIn, (req, res) => {
    const dreamId = req.params.id;
    const { title, content, mood } = req.body;

    // Validate ObjectId
    if (!ObjectId.isValid(dreamId)) {
      return res.status(400).json({ error: 'Invalid dream ID' });
    }

    db.collection('dreams').findOneAndUpdate(
      { _id: new ObjectId(dreamId), userId: req.user._id },
      { 
        $set: { 
          title: title, 
          content: content,
          mood: mood || '',
          updatedAt: new Date()
        } 
      },
      { returnDocument: 'after' }
    )
    .then(result => {
      if (!result.value) {
        return res.status(404).json({ error: 'Dream not found' });
      }
      console.log('Dream updated!');
      res.json(result.value);
    })
    .catch(err => {
      console.error('Update error:', err);
      res.status(500).json({ error: 'Failed to update dream' });
    });
  });

  // DELETE dream
  app.delete('/dreams/:id', isLoggedIn, (req, res) => {
    const dreamId = req.params.id;
    
    // Validate ObjectId
    if (!ObjectId.isValid(dreamId)) {
      return res.status(400).json({ error: 'Invalid dream ID' });
    }

    db.collection('dreams').deleteOne(
      { _id: new ObjectId(dreamId), userId: req.user._id }
    )
    .then(result => {
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Dream not found' });
      }
      console.log('Dream deleted!');
      res.json({ message: 'Dream deleted!' });
    })
    .catch(err => {
      console.error('Delete error:', err);
      res.status(500).json({ error: 'Failed to delete dream' });
    });
  });

  // AUTHENTICATION ROUTES =======================================================

  // LOGIN
  app.get('/login', function(req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

  // SIGNUP
  app.get('/signup', function(req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  // UNLINK ACCOUNTS
  app.get('/unlink/local', isLoggedIn, function(req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });

};

// ROUTE MIDDLEWARE ===========================================================
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}