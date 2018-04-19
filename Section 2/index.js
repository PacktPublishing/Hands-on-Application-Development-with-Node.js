const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const writeQanda = require('./write-qanda');
const expressLess = require('express-less');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded());
app.use(session({ secret: "cats" }));
app.use('/less-css', expressLess(__dirname + '/less'));
app.use('/static', express.static('public'));
app.use(function(request, response, next) {
    console.log('URL:: ' + request.url);
    next();
});
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    function(username, password, done) {
      if (username == 'admin' && password == 'admin') {
          return done(null, {id:'admin', name: 'admin'});
      } else {
          return done(null, false, { message: 'Incorrect password.' });
      }
    })
);

passport.serializeUser(function(user, done) {
    done(null, JSON.stringify(user));
  });
  
passport.deserializeUser(function(user, done) {
    done(null, JSON.parse(user));
});

app.get('/login', (request, response) => response.render('login', {title: 'login'}));
app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);
// As with any middleware it is quintessential to call next()
// if the user is authenticated
var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/login');
  }
app.get('/', (request, response) => response.send('Great to have you here!'));
app.get('/answers', isAuthenticated, (request, response) => {
    let qanda = require('./qanda');
    response.render('answers', { title: 'questions and answers', ... qanda })
});
app.get('/q/:index', isAuthenticated, (request, response) => {
    let index = parseInt(request.params.index);

    handleDetails(response, index);
});
app.get('/qs', (request, response) => {
    let index = parseInt(request.query.index);

    handleDetails(response, index);
});
function handleDetails(response, index) {
    let qanda = require('./qanda');
    let question = qanda.questions[index];
    response.render('detail', { index: index, title: question.question, ... question })
}
app.get('/about', (request, response) => response.send('Explain the request handlers cycle!'));
app.post('/answering/:index', (request, response) => {
    let index = parseInt(request.params.index);
    let qanda = require('./qanda');
    let question = qanda.questions[index];
    question.answers.push(request.body);

    writeQanda(qanda, () => {
        response.redirect('/q/' + index);
    })
});

app.get('*', (request, response) => {
    response.send('Hello we dont know! ' + request.url + ' is not known ...', 404);
});

app.listen(8080, () => { console.log('server started!')})

module.exports = app;