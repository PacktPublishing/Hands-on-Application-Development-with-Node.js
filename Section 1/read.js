var fs = require('fs');

fs.readFile('./log.txt', 'utf-8', function(err, data) {
    if (err) {
        console.warn(err);
        return;
    }
    console.log(data);
})