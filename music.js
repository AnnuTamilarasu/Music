/*const express = require('express');
const multer = require('multer');
const ACRCloud = require('acrcloud');

const app = express();
const upload = multer();

const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'voiceSearch.html'));
});

app.use(express.static(__dirname));

const acr = new ACRCloud({
  host: "identify-us-west-2.acrcloud.com",
  access_key: "d35138a77ea193d489503a4ced81167c",
  access_secret: "XPgPfvviQrdfLmnSzFOtzJaFDOy9ZEItqPyfDc7u"
});

app.post('/music', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No audio file received" });
    }

    console.log("Received file:", req.file.originalname, req.file.mimetype, req.file.size);

    const buffer = req.file.buffer;
    const result = await acr.identify(buffer);
    console.log("ACRCloud raw response:", JSON.stringify(result, null, 2));

    res.json(result);

  } catch (err) {
    console.error("Error in /music route:", err);
    res.status(500).json({ error: "Recognition error", details: err.message });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));*/