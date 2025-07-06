import { ValueObject } from '../common';
import { z, ZodError } from 'zod';

export class EmailVO extends ValueObject<EmailType> {
    protected _type!: void;

    private constructor(value: EmailType) {
        super(value);
    }

    public static create(value: string): EmailVO {
        try {
            const validatedEmail = EmailSchema.parse(value);
            return new EmailVO(validatedEmail);
        } catch (error) {
            if (error instanceof ZodError) {
                const message = error.errors.map((e) => e.message).join(', ');
                throw new InvalidEmailError(`Failed to create EmailVO: ${message}`, error.errors);
            }
            throw new InvalidEmailError('Unexpected error during email validation', error);
        }
    }
}

export class InvalidEmailError extends Error {
    constructor(
        message: string,
        public readonly details?: unknown,
    ) {
        super(message);
        this.name = 'InvalidEmailError';
    }
}

const EmailSchema = z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email format' })
    .max(255, { message: 'Email must not exceed 255 characters' })
    .transform((value) => value.trim().toLowerCase());

type EmailType = z.infer<typeof EmailSchema>;
