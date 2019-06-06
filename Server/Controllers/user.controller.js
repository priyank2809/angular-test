const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');
var arangojs = require('arangojs');

module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;

    // Const variables for connecting to ArangoDB database
    const host = '127.0.0.1'
    const port = '8529'
    const username = 'root'
    const password = 'pass#123'
    const databasename = 'arangodb_test'

    // Connection to ArangoDB
    db = new arangojs.Database({
        url: `http://${host}:${port}`,
        databaseName: databasename
    });
    db.useBasicAuth(username, password);

    collection = db.collection('users');
    
    db.query("FOR doc IN users FILTER doc.email == '" + user.email + "' RETURN doc")
        .then(
                cursor => cursor.all()
        ).then(
        data => { 
            if(data.length == 0) {
                collection.save(user).then(
                    meta => {
                        res.send(user)
                    } ,
                    err => {console.error('Failed to save document:', err) }
                );
            } else {
                if(data.length !== 0) {
                    res.status(422).send(['Duplicate email address found.']);
                } else {
                    collection.save(user).then(
                        meta => {
                            res.send(user)
                        } ,
                        err => {console.error('Failed to save document:', err) }
                    );
                }
            }
        },
        err => { 
            return done(err);
        }
    );

    // user.save((err, doc) => {
    //     if (!err)
    //         res.send(doc);
    //     else {
    //         // console.log('error', err);
    //         if (err.code == 11000)
    //             res.status(422).send(['Duplicate email address found.']);
    //         else
    //             return next(err);
    //     }
    // });
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user });
        //else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email']) });
        }
    );
}
