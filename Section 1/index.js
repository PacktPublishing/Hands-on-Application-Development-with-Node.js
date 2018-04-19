var random = require('./random');
var {limit, guess} = require('./arguments');
var oneLinerJoke = require('one-liner-joke');
var fs = require('fs');

var randomNumber = random(limit);

log('hello from the lottery ' + randomNumber);
if (guess && guess == randomNumber) {
    log('hoeray you have won!');
}
let randomJoke = oneLinerJoke.getRandomJoke();
log(randomJoke.body);

function log(logText) {
    // write to a file
    logText += ' \n';
    fs.appendFile('./log.txt', logText, function(err) {
        if (err) console.log(err);
        console.log(logText);
    })
}