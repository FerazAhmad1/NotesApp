const express = require("express");
const { protect } = require("../controlers/authRouter.js");
const {
  createNotes,
  getAllNotes,
  updateNotes,
  deleteNotes,
} = require("../controlers/notes.js");

const router = express.Router();

router.route("/").get(protect, getAllNotes).post(protect, createNotes);
router.route("/:id").patch(protect, updateNotes).delete(protect, deleteNotes);

module.exports = router;
