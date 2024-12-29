const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); 
const { checkSSN } = require("../smartContract/script");
const multer = require("multer");
const pinataSDK = require("@pinata/sdk");
const fs = require("fs"); 

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const pinata = new pinataSDK("b3eb60a901aee661f770", "08e84e67812b8456400bad3874b6bd54db3b2733bcde7cb67cf4f4d2706adc91");

pinata
  .testAuthentication()
  .then(() => console.log("Pinata bağlantısı başarılı!"))
  .catch((err) => console.error("Pinata bağlantısı başarısız:", err));

const upload = multer({ dest: "uploads/" }); 

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = fs.createReadStream(req.file.path);
    const options = {
      pinataMetadata: { name: req.file.originalname },
      pinataOptions: { cidVersion: 1 },
    };

    const result = await pinata.pinFileToIPFS(file, options);

    res.json({ ipfsLink: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}` });

    fs.unlinkSync(req.file.path);
  } catch (error) {
    console.error("Dosya yüklenirken hata oluştu:", error.message);
    res.status(500).json({ error: "Dosya yüklenirken bir hata oluştu." });
  }
});

app.post("/checkSSN", async (req, res) => {
  const { ssn } = req.body;

  if (!ssn) {
    console.error("National ID (SSN) is missing.");
    return res.status(400).json({ success: false, error: "National ID is required." });
  }

  try {
    console.log("Starting checkSSN function...");
    const tableData = await checkSSN(ssn); 

    res.json({
      success: true,
      message: "License linked successfully!",
      tableData, 
    });
  } catch (error) {
    console.error("Error during checkSSN:", error.message);
    res.status(500).json({ success: false, error: error.message || "An error occurred." });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
