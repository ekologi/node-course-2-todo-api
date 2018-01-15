const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = 'abc123';

bcrypt.genSalt(10,(err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });
});

var hashedPassword = '$2a$10$ZnDpIDzi0.S7dc4xLYhiDupJR2prLgjtIQBFR4GhgCMK38ebDollS';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
} );

// var data = {
//     id: 10
// };

// var token = jwt.sign(data,'secret');

// console.log(token);

// var decode = jwt.verify(token,'secret');
// console.log('Decode data', decode);


// var message = 'I am user number eleven';
// var hash = SHA256(message).toString();

// // console.log('message : ' + message );
// // console.log('hash : ' + hash);

// console.log(`message : ${message}`);
// console.log(`hash : ${hash}`);

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
//     console.log('Data match');
// } else {
//     console.log('Data NOT match ');
// }

