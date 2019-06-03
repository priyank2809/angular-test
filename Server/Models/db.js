const mongoose = require('mongoose');
// const options = {
//     useNewUrlParser : true //To remove "current URL string parser is deprecated" Error.
// };

// mongoose.connect(process.env.MONGODB_URI, options);

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err) {
        console.log('MongoDB connection succeded.');
    } else {
        console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2));
    }
});

require('./user.model');