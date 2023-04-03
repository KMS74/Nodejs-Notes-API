const express = require("express");
const noteController = require("../controller/noteController");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.get("/notes", noteController.getAllNotes);
router.get("/notes/:noteId", noteController.getNote);
router.post("/notes", noteController.saveNote);
router.put("/notes/:noteId", noteController.updateNote);
router.delete("/notes/:noteId", noteController.deleteNote);

module.exports = router;
