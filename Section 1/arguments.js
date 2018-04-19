var args = process.argv.slice(2);

let guess = args[0];
let limit = args[1] || 20;

module.exports.guess = guess;
module.exports.limit = limit;