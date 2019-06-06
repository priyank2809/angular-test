const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var User = mongoose.model('User');
var arangojs = require('arangojs');

passport.use(
    new localStrategy({ usernameField: 'email' },
        (username, password, done) => {

            //Const variables for connecting to ArangoDB database
            const host = '127.0.0.1'
            const port = '8529'
            const dbusername = 'root'
            const dbpassword = 'pass#123'
            const databasename = 'arangodb_test'

            // Connection to ArangoDB
            db = new arangojs.Database({
                url: `http://${host}:${port}`,
                databaseName: databasename
            });
            db.useBasicAuth(dbusername, dbpassword);

            collection = db.collection('users');

            db.query("FOR doc IN users FILTER doc.email == '" + username + "' AND doc.password == '" + password + "' RETURN doc")
                .then(
                        cursor => cursor.all()
              ).then(
                user => { 
                    
                    if(user.length == 0) {
                        return done(null, false, { message: 'Email and Password not matched' });
                    } else {
                        if(user.length !== 0) {
                            

                            const userModel = new User({
                                _id: user[0]['_key'],
                                fullName: user[0]['fullName'],
                                email: user[0]['email'],
                                password: user[0]['password'],
                                saltSecret: user[0]['saltSecret']
                              });

                            return done(null, userModel);
                        } else {
                           
                            return done(null, false, { message: 'Something Went Wrong!!' });
                        }
                     }
                },
                err => { 
              
                    return done(err);
                 }
              );

            // User.findOne({ email: username },
            //     (err, user) => {

            //         if (err) {
            //             return done(err);
                    
            //         } else if (!user) {
            //             // unknown user
            //             return done(null, false, { message: 'Email is not registered' });
                        
            //         } else if (!user.verifyPassword(password)) {
            //             // wrong password
            //             return done(null, false, { message: 'Wrong password.' });
                        
            //         } else {
            //             // authentication succeeded
            //             return done(null, user);
            //         }
                        
            // });
        })
);