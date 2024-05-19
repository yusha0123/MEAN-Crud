import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-note-modal',
  templateUrl: './create-note-modal.component.html',
  styleUrls: ['./create-note-modal.component.css'],
})
export class CreateNoteModalComponent implements OnInit, OnDestroy {
  visible: boolean = false;
  subscription: Subscription | undefined;
  noteForm: FormGroup;

  constructor(
    private messageService: MessageService,
    private modalService: ModalService,
    private formBuilder: FormBuilder
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
      console.log(this.noteForm.value);
    }
  };
}
