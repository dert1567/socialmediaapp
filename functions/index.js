const functions = require('firebase-functions');
const express = require('express')


const { getAllScreams, postOneScream , getScream, commentOnScream, likeScream, unlikeScream } = require('./handlers/scream')
const {signup, login, uploadImage, addUserDetails, getAuthenticatedUser} = require('./handlers/users')
const FBAuth = require('./util/fbAuth')



const app = express()


//Scream Routes

app.get('/screams',getAllScreams)
app.post('/scream', FBAuth, postOneScream);
app.get('/scream/:screamId', getScream);
app.get('/scream/:screamId/like', FBAuth, likeScream)
app.get('/scream/:screamId/unlike', FBAuth, unlikeScream)
app.post('/scream/:screamId/comment', FBAuth, commentOnScream)


//users routes

app.post('/signup', signup)
app.post('/login', login )

app.post ('/user/image',FBAuth, uploadImage)
app.post ('/user', FBAuth, addUserDetails)
app.get('/user', FBAuth, getAuthenticatedUser)






//Post one scream









//Signup Route









exports.api = functions.region('europe-west1').https.onRequest(app); 
