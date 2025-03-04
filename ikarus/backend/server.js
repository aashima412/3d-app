const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const multer = require("multer");
const path = require("path");
const app = express();
app.use(cors());
app.use(express.json());

// Firebase Initialization
const serviceAccount = require("./d-app-1bc39-firebase-adminsdk-fbsvc-4d2232547f.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "d-app-1bc39.appspot.com",
  });
  

const db = admin.firestore();

app.get("/",(req,res)=>{
    res.send("hello");
})
// Fetch models
app.get("/models", async (req, res) => {
  const snapshot = await db.collection("models").get();
  const models = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(models);
});

app.get("/upload", (req, res) => {
    res.sendFile(path.join(__dirname, "../3d-app/src/components", "UploadForm.jsx"));
});


// Upload new model
const upload = multer({ storage: multer.memoryStorage() });
app.post("/upload", upload.single("file"), async (req, res) => {
  const { name, description } = req.body;
  const file = req.file;
  
  if (!file) return res.status(400).json({ error: "No file uploaded" });

  const bucket = admin.storage().bucket();
  const fileRef = bucket.file(`models/${file.originalname}`);
  await fileRef.save(file.buffer);

  const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/models%2F${encodeURIComponent(file.originalname)}?alt=media`;


  const newModel = {
    name,
    description,
    url,
    uploadDate: new Date(),
  };

  await db.collection("models").add(newModel);
  res.json({ message: "Model uploaded successfully", url });
});

app.listen(3000, () => console.log("Server running on port 3000"));
