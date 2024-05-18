import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: "string",
      allowNull: false,
    },
    description: {
      type: "string",
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", NoteSchema);

export default Note;
