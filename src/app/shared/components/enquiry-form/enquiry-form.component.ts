import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ENQUIRY_REPOSITORY } from '../../../core/repositories/repository.tokens';
import { EnquiryRepository } from '../../../core/repositories/enquiry.repository';

@Component({
  selector: 'app-enquiry-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './enquiry-form.component.html',
  styleUrl: './enquiry-form.component.scss'
})
export class EnquiryFormComponent implements OnInit {
  @Input() defaultPackageTitle?: string;

  private fb = inject(FormBuilder);
  private enquiryRepo: EnquiryRepository = inject(ENQUIRY_REPOSITORY);

  enquiryForm!: FormGroup;
  isSubmitting = signal<boolean>(false);
  submitSuccessMessage = signal<string | null>(null);
  submitErrorMessage = signal<string | null>(null);

  ngOnInit() {
    this.enquiryForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\s-]{10,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.maxLength(500)]], // Notes (Optional)
      honeypot: [''] // Anti-spam hidden field
    });
  }

  onSubmit() {
    if (this.enquiryForm.invalid) {
      this.enquiryForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.submitSuccessMessage.set(null);
    this.submitErrorMessage.set(null);

    const formValue = this.enquiryForm.value;

    this.enquiryRepo.submitEnquiry(formValue).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        if (res.success) {
          this.submitSuccessMessage.set(res.message);
          this.enquiryForm.reset();
        } else {
          this.submitErrorMessage.set(res.message || 'Unable to submit enquiry.');
        }
      },
      error: () => {
        this.isSubmitting.set(false);
        this.submitErrorMessage.set('Connection error. Please try again or reach out on WhatsApp.');
      }
    });
  }
}
