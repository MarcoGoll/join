import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactslistComponent } from './contactslist.component';

describe('ContactslistComponent', () => {
  let component: ContactslistComponent;
  let fixture: ComponentFixture<ContactslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
