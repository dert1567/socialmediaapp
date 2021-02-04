const functions = require('firebase-functions');
const admin = require('firebase-admin')
const express = require('express')
const firebase = require('firebase')

admin.initializeApp();

const app = express()



var config = {
    apiKey: "AIzaSyBKdqHmeQuEQqXFygppTwQfpWTuEY5ky8o",
    authDomain: "socialmediaapp-8a9d8.firebaseapp.com",
    projectId: "socialmediaapp-8a9d8",
    storageBucket: "socialmediaapp-8a9d8.appspot.com",
    messagingSenderId: "28066724904",
    appId: "1:28066724904:web:1b3eefcb732807c73fc91d"
};

firebase.initializeApp(config)

const db = admin.firestore();



app.get('/screams', (req, res) => {

    db
        .firestore()
        .collection('screams')
        .orderBy('createdAt', 'desc')
        .get()
        .then((data) => {
            let screams = [];
            data.forEach(doc => {
                screams.push({
                    screamId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt
                });
            });

            return res.json(screams)
        })

        .catch((err) => console.error())


})


app.post('/scream', (req, res) => {

    const newScream = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: new Date().toISOString()

    };

    db.firestore()
        .collection('screams')
        .add(newScream)
        .then(doc => {
            res.json({ message: `document ${doc.id} created successfully` })
        })
        .catch(err => {
            res.status(500).json({ error: 'something went wrong' })
            console.error(err)
        });
});


//Signup Route

app.post('/signup', (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,

    }

    //TOO validate Data

    let token, userId;

    db.doc(`/users/${newUser.handle}`)
    .get()
        .then((doc) => {
            if (doc.exists) {
                return res.status(400).json({ handle: 'this handle is already taken' })
            } else {
                return firebase
                .auth()
                    .createUserWithEmailAndPassword(newUser.email, newUser.password)
            }
        })
        .then((data) => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then((idToken) => {
            token = idToken;
            const userCredentials = {
                handle: newUser.handle,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId
            }
           return  db.doc(`/users/${newUser.handle}`).set(userCredentials);
        })
        .then(() => {
            return res.status(201).json({ token })
        })

        .catch((err) => {
            console.error(err);
            if (err.code === "auth/email-already-in-use") {
                return res.status(400).json({ email: "email is already in use" })

            }

            else {
                return res.status(500).json({ error: err.code })
            }

        })


})


exports.api = functions.region('europe-west1').https.onRequest(app); 