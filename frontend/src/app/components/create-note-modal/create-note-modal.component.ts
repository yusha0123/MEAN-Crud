import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotesService } from 'src/app/services/notes.service';
import { Input } from 'src/app/interfaces/note';

@Component({
  selector: 'app-create-note-modal',
  templateUrl: './create-note-modal.component.html',
  styleUrls: ['./create-note-modal.component.css'],
})
export class CreateNoteModalComponent implements OnInit, OnDestroy {
  visible: boolean = false;
  loading: boolean = false;
  subscription: Subscription | undefined;
  noteForm: FormGroup;

  constructor(
    private messageService: MessageService,
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private notesService: NotesService
  ) {
    this.noteForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.subscription = this.modalService.modalVisibility$.subscribe(
      (visibility) => {
        this.visible = visibility;
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  submitForm = () => {
    if (this.noteForm.valid) {
      this.loading = true;
      const newNote = this.noteForm.value as Input;
      this.notesService.createNote(newNote).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Note created successfully!',
          });
          this.noteForm.reset();
          this.modalService.hideModal();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create note!',
          });
        },
        complete: () => {
          this.loading = false;
        },
      });
    }
  };
}
