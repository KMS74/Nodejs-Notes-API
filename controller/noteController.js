const generator = require("../utils/generator");
const memStorage = require("../utils/memory.storage");
const NoteModel = require("../model/note.model");

exports.getAllNotes = (req, res) => {
  var values = memStorage.getValues(memStorage.store);
  return res.status(200).send(JSON.stringify(values));
};

exports.getNote = (req, res) => {
  // Get specific note by id
  var noteId = req.params.noteId;
  if (!noteId) {
    return res.status(500).send({ error: "note id must be provided" });
  }
  var noteItem = memStorage.store.getItem(noteId);
  if (!noteItem) {
    return res.status(500).send({ error: "Note id is not exist" });
  }
  const note = memStorage.store.getItem(noteId);
  return res.status(200).send(JSON.stringify(note));
};
exports.saveNote = (req, res) => {
  var seqId = generator.generate();
  var title = req.body.title;
  var content = req.body.content;
  var createdBy = "admin";
  var createdOn = new Date();

  if (!title || !content) {
    return res
      .status(500)
      .send({ error: "Title and Content should not be empty" });
  }
  var noteObj = new NoteModel(seqId, title, content, createdBy, createdOn);
  // save Note in Memory Storage
  memStorage.store.setItem(seqId, noteObj);
  return res.status(201).send({
    note: noteObj,
    message: "succesfully saved",
  });
};

exports.updateNote = (req, res) => {
  var noteId = req.params.noteId;
  var title = req.body.title;
  var content = req.body.content;
  var createdBy = "admin";
  var createdOn = new Date();

  if (!noteId) {
    return res.status(500).send({ error: "Note Id should not be empty" });
  }

  if (!title || !content) {
    return res
      .status(500)
      .send({ error: "Title and Content should not be empty" });
  }
  var noteItem = memStorage.store.getItem(noteId);
  if (!noteItem) {
    return res.status(500).send({ error: "Note is not exist" });
  }
  var noteObj = new NoteModel(noteId, title, content, createdBy, createdOn);
  memStorage.store.setItem(noteId, noteObj);
  return res.status(200).send({
    note: noteObj,
    message: "succesfully note updataed",
  });
};

exports.deleteNote = (req, res) => {
  var noteId = req.params.noteId;
  if (!noteId) {
    return res.status(500).send({ error: "can not delete empty nodeId" });
  }
  var noteItem = memStorage.store.getItem(noteId);
  if (!noteItem) {
    return res.status(500).send({ error: "Note is not exist" });
  }

  var noteObj = memStorage.store.getItem(noteId);
  memStorage.store.removeItem(noteId);
  return res.status(200).send({
    note: noteObj,
    message: "succesfully note deleted",
  });
};
