import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from "../controllers/notes";
import { Router } from "express";

export default (router: Router) => {
  router.get("/notes", getNotes);
  router.post("/notes", createNote);
  router.put("/notes/:id", updateNote);
  router.delete("/notes/:id", deleteNote);
};
