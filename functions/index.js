const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");

const app = express();

const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(require("./routes/ingredients.routes"));

exports.app = functions.https.onRequest(app);
