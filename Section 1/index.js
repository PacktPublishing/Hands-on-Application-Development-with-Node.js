var random = require('./random');
var {limit, guess} = require('./arguments');
var funnies = require('funnies');
var fs = require('fs');

var randomNumber = random(limit);

log('hello from the lottery ' + randomNumber);
if (guess && guess == randomNumber) {
    log('hoeray you have won!');
}
var f = new funnies.Funnies();
log(f.message());

function log(msg) {
    // write to a file
    msg += ' \n';
    fs.appendFile('./log.txt', msg, function(err) {
        if (err) return;
        console.log(msg);
    });
}