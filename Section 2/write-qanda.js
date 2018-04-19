let fs = require('fs');

module.exports = function(newQanda, done) {
    fs.writeFile('./qanda.json', JSON.stringify(newQanda), (err) =>{
        if (err) console.log(err);
        console.log('succesfully saved');
        done();
    });
}
