//will show how to use bcrypt to hash password, etc

'use strict';

//bcrypt does not naturally support promises, so we import that functionality
var bluebird = require('bluebird');
var bcrypt = bluebird.promisifyAll(require('bcrypt'));

//bcrypt compiles natively
//npm'd on vagrant- you need to install it where you'll be using it

//node, 2 script, 3 whatever
var password = process.argv[2];
var rounds = 10;

//need to make sure that your algorithm stays as slow as yoru user will allow
if(process.argv.length >= 4) {
	rounds = parseInt(process.argv[3]);
	if(isNaN(rounds)) {
		console.error('number of rounds must be an integer!');
		process.exit(1);
	}
}

console.log("hashing '%s' with %d rounds of bcrypt", password, rounds);
//creates a timer
console.time('duration');

//would normally use .hash, but has bluebird
bcrypt.hashAsync(password, rounds)
	.then(function(hash) {
		console.timeEnd('duration');
		console.log(hash);
		
		return [hash, bcrypt.compareAsync(password, hash)];
	})
	.spread(function(hash, isSame) {
		console.log("comparing hash against '%s' : %j", password, isSame);
		password += 'x';
		return [hash, bcrypt.compareAsync(password, hash)];
	})
	.spread(function(hash, isSame) {
		console.log("comparing hash against '%s': %j", password, isSame);
	})
	.catch(function(err) {
		console.error(err);
		process.exit(1);
	});
	
//to check in vagrant: node bcrypt password

