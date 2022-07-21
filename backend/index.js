const cors = require("cors");
const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const dal = require("./dal.js");

// Firebase
var admin = require("firebase-admin");
// var serviceAccount = require("./secret/ServiceAccountKey.json");
// Using admin secret from serviceAccount Json file
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL:
//         "https://fullstackbank-default-rtdb.firebaseio.com/",
// });

// Using admin secret from serviceAccount .env
console.log(process.env);
admin.initializeApp({
    credential: admin.credential.cert({
        type: process.env.NEXT_PUBLIC_FIREBASE_TYPE,
        project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        private_key_id: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
        client_id: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_ID,
        auth_uri: process.env.NEXT_PUBLIC_FIREBASE_AUTH_URI,
        token_uri: process.env.NEXT_PUBLIC_FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.NEXT_PUBLIC_FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_X509_CERT_URL,
      }),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
});


// Swagger URL /api-docs
var options = {
    explorer: true,
    swaggerOptions: {
        url: "/api-docs/swagger.json",
    },
};
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, options)
);

// used to serve static files from public directory
app.use(express.static("public"));
app.use(cors());

// Authorisation
app.all("*", (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const idToken = authHeader.split(" ")[1];
        // console.log("idtoken: ", idToken);
        admin
            .auth()
            .verifyIdToken(idToken)
            .then(function (decodedToken) {
                // Further logic performed by your API route here
                // console.log(decodedToken);
                var db = admin.database();
                var ref = db.ref("users/" + decodedToken.uid);
                // req.user = {uid: decodedToken.uid}

                // console.log("decodedToken.uid", decodedToken.uid);   
                ref.once("value")
                    .then(snapshot => {
                        req.user = {
                            name: decodedToken.name,
                            email: decodedToken.email,
                            uid: decodedToken.uid,
                            role: snapshot.val().role
                        };
                        next();
                    })
                    .catch(err => {
                        console.log("Error while fetch user profile data from firbase");
                        console.log(err);
                        return res.sendStatus(403);
                    })
            })
            .catch(function (error) {
                console.log("-----------------------");
                console.log(error);
                return res.sendStatus(403);
            });
    } else {
        res.sendStatus(401);
    }
});

// find user account
app.get("/api/account/find/", function (req, res) {
    var uuid = req.user.uid;
    dal.find(uuid).then((user) => {
        // console.log(user);
        res.send(user);
    });
});

// find One user account
app.get("/api/account/findOne/", function (req, res) {
    var uuid = req.user.uid;
    dal.findOne(uuid).then((user) => {
        // console.log(user);
        res.send(user);
    });
});

// update - deposit/withdraw amount
app.get("/api/account/update/:amount", function (req, res) {
    var amount = Number(req.params.amount);
    var uuid = req.user.uid;

    dal.find(uuid).then((user) => {
        // console.log(user);
        if (user && user.length > 0) {
            dal.update(uuid, amount).then((response) => {
                // console.log(response);
                res.send(response);
            });
        } else {
            dal.insert(uuid, amount).then((response) => {
                // console.log(response);
                res.send(response);
            });
        }
    });
});

// withdraw amount
app.get("/api/account/withdraw/:amount", function (req, res) {
    var amount = Number(req.params.amount);
    var uuid = req.user.uid;

    dal.find(uuid).then((user) => {
        // console.log(user);
        if (user && user.length > 0) {
            dal.withdraw(uuid, amount).then((response) => {
                // console.log(response);
                res.send(response);
            });
        }
    });
});

// all accounts
app.get("/api/account/all", function (req, res) {
    if (req.user.role !== "admin") {
        return res.status(401).json({ message: "unauthorized request" });
    }
    let users = [];
    let auth = admin.auth();
    auth.listUsers()
    .then((userRecords) => {
        userRecords.users
            .map(async (user,i) => {
                var db = admin.database();
                var ref = db.ref("users/"+ user.uid);
                var snapshot = await ref.once("value");
                var usr = await dal.findOne(user.uid);
                users.push({
                    name: user.name,
                    email: user.email,
                    uid: user.uid,
                    role: snapshot.val()?.role || "user",
                    balance: usr?.balance || 0,
                });

                if(i === userRecords.users.length-1){
                    res.send(users);
                }
            })
    })
    .catch((error) => {
        console.log("Error at listUser in all acounts", error);
        res.send([])
    });
});

// --------------------------
//   for supertest testing
//   comment out listener
// --------------------------
// start server
// -----------------------
var port = 8080;
app.listen(port);
console.log("Running on port: " + port);

// export app for testing
module.exports = app;