import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from 'src/app/interfaces';
import { ModalService } from 'src/app/services/modal.service';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-edit-note-modal',
  templateUrl: './edit-note-modal.component.html',
  styleUrls: ['./edit-note-modal.component.css'],
})
export class EditNoteModalComponent {
  visible = false;
  editForm: FormGroup;
  currentNote: Note | null = null;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private notesService: NotesService
  ) {
    this.editForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.modalService.editModalVisibility$.subscribe((visible) => {
      this.visible = visible;
    });

    this.modalService.editNote$.subscribe((note) => {
      if (note) {
        this.currentNote = note;
        this.editForm.patchValue(note);
      } else {
        this.currentNote = null;
        this.editForm.reset();
      }
    });
  }

  closeModal() {
    this.modalService.hideEditModal();
  }

  onSubmit() {
    if (this.editForm.valid && this.currentNote) {
      const updatedNote = {
        ...this.currentNote,
        ...this.editForm.value,
      };

      console.log(updatedNote);
    }
  }
}
