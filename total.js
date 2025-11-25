const express = require('express');
const multer = require('multer');
const ACRCloud = require('acrcloud');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); 

const acr = new ACRCloud({
  host: "identify-us-west-2.acrcloud.com",
  access_key: "d35138a77ea193d489503a4ced81167c",
  access_secret: "XPgPfvviQrdfLmnSzFOtzJaFDOy9ZEItqPyfDc7u"
});

const uri = "mongodb+srv://AXkyJellyfish:A2Xky1314%28%29@cluster0.6ndamsl.mongodb.net/myApp?retryWrites=true&w=majority";
const client = new MongoClient(uri);

let usersCollection;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'voiceSearch.html'));
});

app.post('/music', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No audio file received" });
    }

    const buffer = req.file.buffer;
    const result = await acr.identify(buffer);

    res.json(result);

  } catch (err) {
    console.error("Error in /music:", err);
    res.status(500).json({ error: "Recognition error", details: err.message });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.json({ success: false, message: "Missing username or password" });

    const existing = await usersCollection.findOne({ username });
    if (existing)
      return res.json({ success: false, message: "User exists" });

    await usersCollection.insertOne({ username, password });
    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.json({ success: false, message: "Missing username or password" });

    const user = await usersCollection.findOne({ username });

    if (!user || user.password !== password)
      return res.json({ success: false, message: "Invalid username or password" });

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Server error" });
  }
});

async function startServer() {
  try {
    await client.connect();
    console.log("MongoDB connected");

    usersCollection = client.db("myApp").collection("users");

    app.listen(3000, () => console.log("Server running on http://localhost:3000"));
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}

startServer();