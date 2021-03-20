const {Router} = require("express");
const router = Router();

const admin = require("firebase-admin");
const db = admin.firestore()

//add an ingredient
router.post("/api/ingredients", async (req, res) => {
  try {
    await db.collection("ingredients").doc().create({name: req.body.name})
    return res.status(204).json()
  }
  catch(error) {
    console.log(error);
    return res.status(500).send(error)
  }
});

// get all ingredients
router.get("/api/ingredients", async (req, res) => {
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

// get ingredient by id
router.get("/api/ingredients/:ingredient_id", (req, res) => {
  (async () => {
    try {
      const doc = db.collection("ingredients").doc(req.params.ingredient_id);
      const item = await doc.get();
      const response = item.data();
      return res.status(200).send(response);
    } catch (error) {
      return res.status(500).send(error);
    }
  })();
});



module.exports = router;
