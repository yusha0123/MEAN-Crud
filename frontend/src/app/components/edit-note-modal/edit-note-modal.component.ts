import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
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
  loading = false;
  editForm: FormGroup;
  currentNote: Note | null = null;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private notesService: NotesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
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

      this.notesService.updateNote(updatedNote).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Success',
            detail: 'Note updated successfully!',
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update note!',
          });
        },
        complete: () => {
          this.loading = false;
          this.modalService.hideEditModal();
        },
      });
    }
  }

  onDelete() {
    this.loading = true;
    this.confirmationService.confirm({
      message: 'Do you want to delete this Note?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.notesService.deleteNote(this.currentNote?._id!).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Note deleted successfully!',
            });
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete note!',
            });
          },
          complete: () => {
            this.loading = false;
            this.modalService.hideEditModal();
          },
        });
      },
    });
  }
}
