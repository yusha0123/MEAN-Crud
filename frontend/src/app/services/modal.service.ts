import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Note } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private createModalVisibilitySource = new BehaviorSubject<boolean>(false);
  createModalVisibility$ = this.createModalVisibilitySource.asObservable();
  private editModalVisibilitySource = new BehaviorSubject<boolean>(false);
  editModalVisibility$ = this.editModalVisibilitySource.asObservable();

  private editNoteSource = new Subject<Note | null>();
  editNote$ = this.editNoteSource.asObservable();

  showCreateModal() {
    this.createModalVisibilitySource.next(true);
  }

  hideCreateModal() {
    this.createModalVisibilitySource.next(false);
  }

  showEditModal(note: Note) {
    this.editNoteSource.next(note);
    this.editModalVisibilitySource.next(true);
  }

  hideEditModal() {
    this.editNoteSource.next(null);
    this.editModalVisibilitySource.next(false);
  }
}
