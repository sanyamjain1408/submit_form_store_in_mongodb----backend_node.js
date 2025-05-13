// routes/contactRoute.js
const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

router.post("/contact", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).send("Form submitted successfully ✅");
  } catch (err) {
    res.status(500).send("Error saving form ❌");
  }
});

module.exports = router;
