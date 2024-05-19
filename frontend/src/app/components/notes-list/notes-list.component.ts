import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/interfaces/note';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css'],
})
export class NotesListComponent implements OnInit {
  notes: Note[] = [];
  loading: boolean = false;

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.loadNotes();
    this.notesService.refreshNotes$.subscribe(() => {
      this.loadNotes();
    });
  }

  loadNotes() {
    this.loading = true;
    this.notesService.getNotes().subscribe({
      next: (notes: Note[]) => {
        this.notes = notes;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching notes:', error);
      },
    });
  }
}
