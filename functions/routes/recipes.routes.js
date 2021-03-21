const {Router} = require("express");
const router = Router();

const admin = require("firebase-admin");
const db = admin.firestore()

// get all recipes
router.get("/api/recipes", async (req, res) => {
  try {
    const query = db.collection("recipes")
    const querySnapshot = await query.get()
    const docs = querySnapshot.docs

    const response = docs.map((doc) => ({
      id: doc.id,
      diners: doc.data().diners,
      images: doc.data().images,
      ingredients: doc.data().ingredients,
      instructions: doc.data().instructions,
      time: doc.data().time,
      title: doc.data().title,
    }))

    return res.status(200).json(response)
  }
  catch(error) {
    console.log(error);
    return res.status(500).json()
  }
});

// get recipe by id
router.get("/api/recipes/:recipe_id", (req, res) => {
  (async () => {
    try {
      const doc = db.collection("recipes").doc(req.params.recipe_id);
      const item = await doc.get();
      const response = item.data();
      return res.status(200).send(response);
    } catch (error) {
      return res.status(500).send(error);
    }
  })();
});

//add a recipe
router.post("/api/recipes", async (req, res) => {
  try {
    await db.collection("recipes")
      .doc()
      .create({
        diners: req.body.diners,
        images: req.body.images,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        time: req.body.time,
        title: req.body.title,

      })
    return res.status(204).json()
  }
  catch(error) {
    console.log(error);
    return res.status(500).send(error)
  }
});

//edit a recipe
router.put("/api/recipes/:recipe_id", async (req, res) => {
  try {
    const document = db.collection("recipes").doc(req.params.recipe_id);
    await document.update({
      diners: req.body.diners,
        images: req.body.images,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        time: req.body.time,
        title: req.body.title,
    });
    return res.status(200).json();
  } catch (error) {
    return res.status(500).json();
  }
});

// delete a recipe
router.delete("/api/recipes/:recipe_id", async (req, res) => {
  try {
    const doc = db.collection("recipes").doc(req.params.recipe_id);
    await doc.delete();
    return res.status(200).json();
  } catch (error) {
    return res.status(500).send(error);
  }
});




module.exports = router;
