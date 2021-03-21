const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors")

const app = express();

const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(cors({ origin: true, credentials: true }));
app.use(require("./routes/ingredients.routes"));
app.use(require("./routes/recipes.routes"));

exports.app = functions.https.onRequest(app);
