// models/note.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  sem: String,
  subject: String,
  info: String,
  pdfUrl: String,
});

const Note = mongoose.models.Note || mongoose.model('Note', noteSchema);

module.exports = Note;

