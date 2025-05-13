const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const contact = require("./models/contact");
require("dotenv").config();


const app = express();
const PORT = 5000;


app.use(cors({
  origin: "http://localhost:5173" // frontend ka URL
}));
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo error", err));
  

  
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;
      console.log("name",name);
      const newContact = new contact({ name, email, message });
      console.log("email",email);
      await newContact.save();
      res.status(200).send("Message saved successfully");
    } catch (err) {
      res.status(500).send("Server error 1",err);
    }
  });

// Default route
app.get("/", (req, res) => {
  res.send("Backend server is running ✅");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
