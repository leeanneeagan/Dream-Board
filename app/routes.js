// app/routes.js
module.exports = function(app, passport, db) {

  // NORMAL ROUTES ===============================================================

  // home page
  app.get('/', function(req, res) {
    res.render('index.ejs');
  });

  // PROFILE SECTION ===========================================================
  app.get('/profile', isLoggedIn, function(req, res) {
    // first get messages
    db.collection('messages').find().toArray((err, messages) => {
      if (err) return console.log(err)
      // then get dreams for this user
      db.collection('dreams').find({ userId: req.user._id }).toArray((err, dreams) => {
        if (err) return console.log(err)
        res.render('profile.ejs', {
          user: req.user,
          messages,
          dreams
        })
      })
    })
  });

  // LOGOUT ====================================================================
  app.get('/logout', function(req, res) {
    req.logout(() => {
      console.log('User has logged out!')
    });
    res.redirect('/');
  });



// DREAM ROUTES ================================================================
app.get('/dreams', isLoggedIn, (req, res) => {
  db.collection('dreams').find({ userId: req.user._id }).toArray((err, result) => {
    if (err) return console.log(err)
    res.render('profile.ejs', {
      user: req.user,
      dreams: result
    })
  })
});

app.post('/dreams', isLoggedIn, (req, res) => {
  db.collection('dreams').save(
    {
      title: req.body.title,
      content: req.body.content,
      userId: req.user._id,
      createdAt: new Date() // timestamp
    },
    (err, result) => {
      if (err) return console.log(err)
      console.log('Dream saved to database')
      res.redirect('/profile')
    }
  )
})

// ✏️ EDIT a dream
app.put('/dreams/:id', isLoggedIn, (req, res) => {
  const dreamId = req.params.id
  const { title, content } = req.body

  db.collection('dreams').findOneAndUpdate(
    { _id: require('mongodb').ObjectId(dreamId), userId: req.user._id },
    { $set: { title, content } },
    { returnDocument: 'after' },
    (err, result) => {
      if (err) return res.status(500).send(err)
      console.log('Dream updated!')
      res.send(result.value)
    }
  )
})

app.delete('/dreams/:id', isLoggedIn, (req, res) => {
  const dreamId = req.params.id;
  db.collection('dreams').deleteOne(
    { _id: require('mongodb').ObjectId(dreamId), userId: req.user._id },
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send('Dream deleted!');
    }
  );
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
