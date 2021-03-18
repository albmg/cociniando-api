const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const express = require("express");

const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore()

app.post("/api/ingredients", async (req, res) => {
  try {
    await db.collection("ingredients").doc().create({name: req.body.name})
    return res.status(204).json()
  }
  catch(error) {
    console.log(error);
    return res.status(500).send(error)
  }
});

app.get("/api/ingredients", async (req, res) => {
  try {
    const query = db.collection("ingredients")
    const querySnapshot = await query.get()
    const docs = querySnapshot.docs

    const response = docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
    }))

    return res.status(200).json(response)
  }
  catch(error) {
    console.log(error);
    return res.status(500).json()
  }
});

exports.app = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
