import { AggregateRoot, EmailVO, IdVO, UserIdType } from '@calm-mail/shared-domain';
import { UserCreatedEvent } from './event/user-created.event';

export interface UserProps {
    readonly id: IdVO<UserIdType>;
    readonly email: EmailVO;
    readonly passwordHash: string;
    readonly name: string | null;
    readonly isEmailVerified: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}

export type CreateUserProps = Omit<UserProps, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * User Entity
 *
 * Domain entity representing a user in the system.
 * This follows Clean Architecture principles with proper encapsulation and immutability.
 *
 * Properties:
 * - id: Unique identifier (UserId value object)
 * - email: User's email address (EmailVO)
 * - passwordHash: Hashed password for authentication
 * - name: User's display name (optional)
 * - isEmailVerified: Whether the user's email has been verified
 * - createdAt: When user was created
 * - updatedAt: When user was last updated
 */
export class User extends AggregateRoot<IdVO<UserIdType>> {
    private readonly props: UserProps;

    constructor(props: UserProps) {
        super(props.id);
        this.validateProps(props);
        this.props = Object.freeze(props); // Ensure immutability
    }

    get email(): EmailVO {
        return this.props.email;
    }

    get passwordHash(): string {
        return this.props.passwordHash;
    }

    get name(): string | null {
        return this.props.name;
    }

    get isEmailVerified(): boolean {
        return this.props.isEmailVerified;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    get updatedAt(): Date {
        return this.props.updatedAt;
    }

    static create(props: { email: string; passwordHash: string; name?: string }): User {
        try {
            const userId = IdVO.generate<UserIdType>('UserId');
            const now = new Date();
            const user = new User({
                id: userId,
                email: EmailVO.create(props.email),
                passwordHash: props.passwordHash,
                name: props.name || null,
                isEmailVerified: false,
                createdAt: now,
                updatedAt: now,
            });

            user.addDomainEvent(new UserCreatedEvent(userId.getValue(), props.email));
            return user;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(`Failed to create User: ${message}`);
        }
    }

    verifyEmail(): User {
        return new User({
            ...this.props,
            isEmailVerified: true,
            updatedAt: new Date(),
        });
    }

    updateProfile(name: string): User {
        return new User({
            ...this.props,
            name,
            updatedAt: new Date(),
        });
    }

    private validateProps(props: UserProps): void {
        if (!props.passwordHash.trim()) throw new Error('Password hash cannot be empty');
        if (props.name !== null && !props.name.trim()) throw new Error('Name cannot be empty string');
    }
}
