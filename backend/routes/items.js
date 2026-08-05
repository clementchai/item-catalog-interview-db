const express = require("express");
const router = express.Router();
const store = require("../data/items");

// GET /api/items?search=&category=&page=&limit=
// Written with async/await + try/catch.
router.get("/", async (req, res) => {
  try {
    const { search, category, page = 1, limit = 5 } = req.query;
    let results = store.getAll();

    if (search) {
      results = results.filter((i) =>
        i.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      // NOTE: exact match, case-sensitive.
      results = results.filter((i) => i.category === category);
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const start = (pageNum - 1) * limitNum;
    const paged = results.slice(start, start + limitNum);

    res.json({
      data: paged,
      total: results.length,
      page: pageNum,
      limit: limitNum,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// GET /api/items/:id
router.get("/:id", async (req, res) => {
  try {
    const item = store.getById(parseInt(req.params.id, 10));
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch item" });
  }
});

// POST /api/items
// Written in an older .then/.catch style, no input validation.
// (Different style than the routes above — intentional inconsistency.)
router.post("/", (req, res) => {
  Promise.resolve()
    .then(() => {
      const newItem = store.create(req.body);
      res.status(201).json(newItem);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to create item" });
    });
});

module.exports = router;
