const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const writeQanda = require('./write-qanda');
const expressLess = require('express-less');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const models = require('./models');

// socket.IO
const http = require('http').Server(app);
const io = require('socket.io')(http);

let questionNSP = io.of('/question');
questionNSP.on('connection', (socket) => {
    console.log('new connected user ' + socket.id);
    socket.on('disconnect', () => {
        console.log('we are disconnecting ' + socket.id);
    });
    socket.on('up', (q) => {
        models.Question.findById(q.id).then(result => {
            if (result) {
                result.count += 1;
                result.save();

                socket.broadcast.emit('update', result);
                socket.emit('update', result);
            }
        });
    })
});

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

passport.use(new LocalStrategy({
    passReqToCallback : true
  }, function(req, username, password, done) {
        return models.User.findAll({where: {userName: username, password: password} })
                          .then( (users) => {
            if (users.length > 0)
                return done(null, users[0]);
            else 
                return done(null, false);
          }).catch( err => {
            return done(null, false);
          })
    })
);

passport.serializeUser(function(user, done) {
    done(null, user.get('id'));
  });
  
passport.deserializeUser(function(userId, done) {
    models.User.findById(userId).then( u => done(null, u) );
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
app.get('/questions', (request, response) => {
    models.Question.findAll().then((values) => {
        response.render('questions', { title: 'questions and answers', questions: values })
    }); 
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
    models.Question.findById(index).then( (question) => {
        question.getAnswers().then( answers => {
            response.render('detail', { index: index, title: question.text, answers: answers })
        })
        
    });
}
app.get('/about', (request, response) => response.send('Explain the request handlers cycle!'));
app.post('/answering/:index', (request, response) => {
    let index = parseInt(request.params.index);

    models.Answer.create({text: request.body.answer, questionId: index, userId: 1}).then((answer) => {
        answer.save();
        response.redirect('/q/' + index);
    }).catch( err => response.write(err));
});

app.get('*', (request, response) => {
    response.send('Hello we dont know! ' + request.url + ' is not known ...', 404);
});

models.sequelize.sync().then(() => {
    http.listen(8080, () => { console.log('server started!')})
})




module.exports = app;