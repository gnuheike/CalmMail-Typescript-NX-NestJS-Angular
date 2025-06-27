import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export function emailListValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null; // Handled by Validators.required if needed
        }

        const emails = (control.value as string)
            .split(',')
            .map((email) => email.trim())
            .filter((email) => email.length > 0);

        // If the input was just spaces or commas, but not empty, it's invalid if required
        // or if it means to contain emails but doesn't resolve to any.
        if (emails.length === 0 && control.value.trim() !== '') {
            return {
                invalidEmailList: true,
                message: 'Please enter at least one valid email address or clear the field.',
            };
        }

        for (const email of emails) {
            // Leverage Angular's own email validator for individual checks
            const tempControl = new FormControl(email);
            if (Validators.email(tempControl)) {
                // Validators.email returns an error map if invalid, null if valid
                return { invalidEmailList: true, message: `"${email}" is not a valid email address.` };
            }
        }
        return null; // All emails in the list are valid
    };
}
