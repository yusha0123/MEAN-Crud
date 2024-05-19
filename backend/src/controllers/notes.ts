import { Request, Response } from "express";
import Note from "../models/note";

export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "All the fields are required!",
      });
    }

    const note = await Note.create({
      title,
      description,
    });
    return res.status(201).json(note);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find({});
    res.json(notes);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    const note = await Note.findByIdAndUpdate(
      id,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found!",
      });
    }

    return res.json({
      success: true,
      message: "Note updated successfully!",
      note,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const success = await Note.findByIdAndDelete(id);

    if (!success) {
      return res.status(404).json({
        success: false,
        message: "Note not found!",
      });
    }

    return res.json({
      success: true,
      message: "Note deleted successfully!",
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
