import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject, input, OnChanges, OnInit, output, SimpleChanges } from '@angular/core';
import { IonButton, IonInput, IonItem, IonLabel, IonTextarea } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { emailListValidator } from '@calm-mail/frontend-shared';

// email-compose-form.model.ts (or within the component file if preferred)
export interface EmailFormValue {
    to: string; // Comma-separated string
    cc: string; // Comma-separated string
    bcc: string; // Comma-separated string
    subject: string;
    body: string;
}

// This remains your desired output structure
export interface EmailComposeFormSubmitEvent {
    to: string[];
    cc: string[];
    bcc: string[];
    subject: string;
    body: string;
}

export interface EmailFormValue {
    to: string;
    cc: string;
    bcc: string;
    subject: string;
    body: string;
}

export interface EmailComposeFormSubmitEvent {
    to: string[];
    cc: string[];
    bcc: string[];
    subject: string;
    body: string;
}

@Component({
    selector: 'lib-email-compose-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, IonInput, IonItem, IonLabel, IonTextarea, IonButton],
    templateUrl: './email-compose-form.component.html',
    styleUrls: ['./email-compose-form.component.css'],
})
export class EmailComposeFormComponent implements OnInit, OnChanges {
    // Inputs
    readonly initialData = input<Partial<EmailFormValue> | null | undefined>(null);
    readonly submitButtonText = input<string>('Send');
    readonly isSubmitting = input<boolean>(false); // To disable button during submission

    // Outputs
    readonly formSubmit = output<EmailComposeFormSubmitEvent>();
    readonly formValueChange = output<EmailFormValue>(); // Optional: if parent needs live values

    emailForm: FormGroup;

    private readonly fb = inject(FormBuilder);

    constructor() {
        this.emailForm = this.fb.group({
            to: ['', [Validators.required, emailListValidator()]],
            cc: ['', [emailListValidator()]],
            bcc: ['', [emailListValidator()]],
            subject: ['', [Validators.required, Validators.maxLength(255)]],
            body: ['', [Validators.required, Validators.maxLength(1024 * 1024)]],
        });

        // Optionally emit value changes
        this.emailForm.valueChanges.subscribe((value) => {
            this.formValueChange.emit(value as EmailFormValue);
        });
    }

    // Expose control getters for easier template access and error handling
    get toCtrl() {
        return this.emailForm.get('to');
    }

    get ccCtrl() {
        return this.emailForm.get('cc');
    }

    get bccCtrl() {
        return this.emailForm.get('bcc');
    }

    get subjectCtrl() {
        return this.emailForm.get('subject');
    }

    get bodyCtrl() {
        return this.emailForm.get('body');
    }

    ngOnInit(): void {
        this.updateFormValues(this.initialData());
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['initialData']) {
            this.updateFormValues(this.initialData());
        }
    }

    onSubmit(): void {
        if (this.emailForm.valid) {
            const rawValue = this.emailForm.getRawValue() as EmailFormValue;
            this.formSubmit.emit({
                to: this.splitEmails(rawValue.to),
                cc: this.splitEmails(rawValue.cc),
                bcc: this.splitEmails(rawValue.bcc),
                subject: rawValue.subject,
                body: rawValue.body,
            });
        } else {
            this.emailForm.markAllAsTouched(); // Trigger validation messages display
            console.log('Form is invalid');
        }
    }

    resetForm(): void {
        this.emailForm.reset(this.initialData() || {});
    }

    private updateFormValues(data: Partial<EmailFormValue> | null | undefined): void {
        if (data) {
            this.emailForm.patchValue(data);
        }
    }

    private splitEmails(emails: string): string[] {
        if (!emails) return [];
        return emails
            .split(',')
            .map((email) => email.trim())
            .filter((email) => email.length > 0);
    }
}
