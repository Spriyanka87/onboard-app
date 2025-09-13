const express = require("express");
const router = express.Router();
const Subscription = require("../models/subscription");

// GET all
router.get("/getallsubscriptions", async (req, res) => {
  try {
    const subs = await Subscription.find().sort({ toilets: 1, frequency: 1 });
    res.json(subs);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch subscriptions" });
  }
});

// (Optional) Admin add new
router.post("/suscriptions", async (req, res) => {
  try {
    const sub = await Subscription.create(req.body);
    res.status(201).json(sub);
  } catch (e) {
    res.status(400).json({ message: "Create failed", error: e.message });
  }
});

// One-tap seed (idempotent): inserts 2 & 3 toilet plans if missing
router.post("/seed", async (_req, res) => {
  const seedData = [
    { toilets: 2, frequency: "2 Times", price: 889 },
    { toilets: 2, frequency: "4 Times", price: 1599 },
    { toilets: 3, frequency: "2 Times", price: 1349 },
    { toilets: 3, frequency: "4 Times", price: 2399 },
  ];
  try {
    for (const s of seedData) {
      const exists = await Subscription.findOne({ toilets: s.toilets, frequency: s.frequency });
      if (!exists) await Subscription.create(s);
    }
    const all = await Subscription.find().sort({ toilets: 1, frequency: 1 });
    res.json({ inserted: true, count: all.length, data: all });
  } catch (e) {
    res.status(500).json({ message: "Seed failed", error: e.message });
  }
});

module.exports = router;
