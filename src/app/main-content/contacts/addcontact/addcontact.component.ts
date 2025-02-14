import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addcontact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './addcontact.component.html',
  styleUrl: './addcontact.component.scss'
})
export class AddcontactComponent implements OnInit {

  isVisible = true;
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  show() {
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }

  closeModal(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('overlay')) {
      this.close();
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      // we can send the Form Information from here to Server :)
      this.close();
    }
  }
}
