import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalVisibilitySource = new BehaviorSubject<boolean>(false);
  modalVisibility$ = this.modalVisibilitySource.asObservable();

  showModal() {
    this.modalVisibilitySource.next(true);
  }

  hideModal() {
    this.modalVisibilitySource.next(false);
  }
}
