const assert = require('assert');
const User = require('../db').User;
const bcrypt = require('bcrypt');

describe('testing the signup, password hashing', () => {
   beforeEach((done) => {
       const sampleUser = new User({
           email: 'test-user@test.com',
           password: 'test1234'
       });

       bcrypt.hash(sampleUser.password, 10, (err, hash) => {
          if(err) return err;
          sampleUser.password = hash;

           User.create(sampleUser, (err) => {
               if(err) {
                   console.error(err);
               }
               done();
           });
       });

   });

   it('retrieve password for the user and check if it\'s hashed', (done) => {
      User.find( {email: 'test-user@test.com'} )
          .then((userObj) => {
              console.log(userObj)
              assert(userObj[0].password !== 'test1234');
              done();
          });
   });

   it('fails for wrong credentials', (done) => {
       User.findOne({ email: 'test-user@test.com'})
           .then((userObj) => {
                bcrypt.compare('test123', userObj.password, (err, response) => {
                   assert(response === false);
                });
           }).then(done, done);
   });

   it('passes for the correct credentials', (done) => {
       User.findOne({ email: 'test-user@test.com'})
           .then((userObj) => {
               bcrypt.compare('test1234', userObj.password, (err, response) => {
                   assert(response === true);
               });
           }).then(done, done);
   });
});

