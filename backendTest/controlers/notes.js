const Notes = require("../models/notes.js");

exports.createNotes = async (req, res, next) => {
  try {
    const { note } = req.body;
    const createNote = await req.user.createNote({ note });
    const data = createNote.dataValues;
    res.status(201).json({
      code: 1,
      data,
      message: "notes created successfull",
    });
  } catch (error) {
    res.status(400).json({
      code: 0,
      message: error.message || "SOMETHING WENT WRONG",
      data: null,
    });
  }
};

exports.getAllNotes = async (req, res, next) => {
  try {
    const { page, limit } = req.params;
    const allNotes = await req.user.getNotes();
    res.status(200).json({
      code: 1,
      data: allNotes,
      message: "get all notes successfully",
    });
  } catch (error) {
    res.status(500).json({
      code: 0,
      data: null,
      message: error.message || "SOMETHING WENT WRONG",
    });
  }
};

exports.updateNotes = async (req, res) => {
  try {
    const userId = req.user.dataValues.id;
    const note = req.body.note;
    const id = req.params.id;
    const response = await Notes.update(note, { where: { id, userId } });
    if (response.length == 0) {
      throw {
        status: 400,
        message: "SOMETHING WRONG",
      };
    }

    const data = { id, userId, note };

    res.status(200).json({
      code: 1,
      data,
      message: "notes updated successfully",
    });
  } catch (error) {
    res.status(error.status || 500).json({
      code: 0,
      data: null,
      message,
    });
  }
};

exports.deleteNotes = async (req, res) => {
  try {
    const userId = req.user.dataValues.id;

    const id = req.params.id;
    const response = await Notes.destroy({ where: { id, userId } });
    res.status(200).json({
      code: 1,
      data: { id, userId },
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(error.status || 500).json({
      code: 0,
      data: null,
      message: "SOMETHING WENT WRONG",
    });
  }
};
