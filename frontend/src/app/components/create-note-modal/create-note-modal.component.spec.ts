import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNoteModalComponent } from './create-note-modal.component';

describe('CreateNoteModalComponent', () => {
  let component: CreateNoteModalComponent;
  let fixture: ComponentFixture<CreateNoteModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNoteModalComponent]
    });
    fixture = TestBed.createComponent(CreateNoteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
