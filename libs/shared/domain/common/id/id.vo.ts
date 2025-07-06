import { z, ZodError } from 'zod';
import { createId } from '@paralleldrive/cuid2';
import { ValueObject } from '../value-object/value-object';

// Custom error
export class InvalidIdError extends Error {
    constructor(
        message: string,
        public readonly details?: unknown,
    ) {
        super(message);
        this.name = 'InvalidIdError';
    }
}

export const IdSchema = z.string().cuid2({ message: 'ID must be a valid CUID2' });

// Base ID type
export type IdType = z.infer<typeof IdSchema>;

export interface IdBrand {
    readonly __brand: string;
}

export type BrandedId = IdType & IdBrand;

export class IdVO<T extends BrandedId> extends ValueObject<T> {
    protected _type!: void;

    private constructor(value: T) {
        super(value);
    }

    public static create<B extends BrandedId>(
        value: string,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        brand: B extends IdType & { readonly __brand: infer R } ? R : never,
    ): IdVO<B> {
        try {
            const validatedId = IdSchema.parse(value);
            // Cast to branded type (safe since validation ensures it's a valid ID)
            return new IdVO(validatedId as B);
        } catch (error) {
            if (error instanceof ZodError) {
                const message = error.errors.map((e) => e.message).join(', ');
                throw new InvalidIdError(`Failed to create IdVO: ${message}`, error.errors);
            }
            throw new InvalidIdError('Unexpected error during ID validation', error);
        }
    }

    // Generic generate method to support branded types
    public static generate<B extends BrandedId>(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        brand: B extends IdType & { readonly __brand: infer R } ? R : never,
    ): IdVO<B> {
        try {
            const generatedId = createId();
            const validatedId = IdSchema.parse(generatedId); // Validate for robustness
            return new IdVO(validatedId as B);
        } catch (error) {
            // Rare case: CUID2 generation fails validation
            throw new InvalidIdError('Failed to generate valid CUID2 ID', error);
        }
    }
}
