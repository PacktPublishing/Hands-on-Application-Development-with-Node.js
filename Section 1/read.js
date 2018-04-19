var fs = require('fs');
 
fs.readFile('./log.txt', 'utf8', function(err, contents) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(contents);
});