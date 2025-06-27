import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { EmailComposeFormComponent, EmailComposeFormSubmitEvent, EmailFormValue } from '@calm-mail/frontend-ui';
import { AuthFacade, ComposeFacade } from '@calm-mail/frontend-application';

@Component({
    selector: 'app-compose-email',
    standalone: true,
    imports: [FormsModule, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar, EmailComposeFormComponent],
    templateUrl: './compose-email-screen.component.html',
    styleUrl: './compose-email-screen.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComposeEmailScreenComponent {
    // Signals for component state
    draftEmail = signal<Partial<EmailFormValue> | null>(null);
    isSendingEmail = signal<boolean>(false);
    currentDraft = signal<EmailFormValue | null>(null);

    // Service injections
    private readonly router = inject(Router);
    private readonly composeFacade = inject(ComposeFacade);
    private readonly authFacade = inject(AuthFacade);

    /**
     * Handle form submission from the EmailComposeFormComponent
     */
    async handleFormSubmission(formData: EmailComposeFormSubmitEvent): Promise<void> {
        try {
            this.isSendingEmail.set(true);

            // Get the current user's email from auth state
            const userEmail = this.authFacade.currentUserEmail() || '';
            if (!userEmail) {
                console.error('User email not available');
                return;
            }

            await this.composeFacade.sendEmail(userEmail.toString(), formData.to, formData.subject, formData.body, formData.cc, formData.bcc);

            // Clear the form after successful submission
            this.draftEmail.set(null);
            this.currentDraft.set(null);

            // Navigate back to inbox
            await this.router.navigate(['/inbox']);
        } catch (error) {
            console.error('Failed to send email:', error);
            // Here you could add error handling, like showing a toast
        } finally {
            this.isSendingEmail.set(false);
        }
    }

    /**
     * Save the current form values as a draft
     */
    async saveDraft(): Promise<void> {
        if (!this.currentDraft()) return;

        const draft = this.currentDraft();
        if (!draft) return;

        try {
            // Get the current user's email from auth state
            const userEmail = this.authFacade.currentUserEmail() || '';
            if (!userEmail) {
                console.error('User email not available');
                return;
            }

            // Use EmailComposeFormComponent's output format for emails
            // This would normally come from the form's submit event
            // For draft saving, we need to split the emails ourselves
            const to = draft.to
                .split(',')
                .map((e) => e.trim())
                .filter((e) => e.length > 0);
            const cc = draft.cc
                .split(',')
                .map((e) => e.trim())
                .filter((e) => e.length > 0);
            const bcc = draft.bcc
                .split(',')
                .map((e) => e.trim())
                .filter((e) => e.length > 0);

            await this.composeFacade.saveDraft(userEmail.toString(), to, draft.subject, draft.body, cc, bcc);

            // Navigate back to inbox after saving
            await this.router.navigate(['/inbox']);
        } catch (error) {
            console.error('Failed to save draft:', error);
        }
    }

    /**
     * Track form value changes for potential draft saving
     */
    logDraft(formValue: EmailFormValue): void {
        this.currentDraft.set(formValue);
        // You could implement auto-save functionality here
    }

    /**
     * Cancel composing and return to inbox
     */
    onCancel(): Promise<boolean> {
        // You could add a confirmation dialog here if the form has unsaved changes
        return this.router.navigate(['/inbox']);
    }
}
