const functions = require('firebase-functions');
const express = require('express')


const { getAllScreams, postOneScream  } = require('./handlers/scream')
const {signup, login} = require('./handlers/users')
const FBAuth = require('./util/fbAuth')


const app = express()


//Scream Routes

app.get('/screams',getAllScreams)
app.post('/scream', FBAuth, postOneScream);

<<<<<<< HEAD
=======
var config = {
 
};
>>>>>>> 9ed94db6189dece5443671ed7e3f2a743898aa46

//users routes

app.post('/signup', signup)
app.post('/login', login )








//Post one scream









//Signup Route









exports.api = functions.region('europe-west1').https.onRequest(app); 
