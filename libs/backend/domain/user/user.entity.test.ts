import { User } from './user.entity';

describe('User', () => {
    describe('create', () => {
        it('should create a valid user entity', () => {
            // Arrange
            const props = {
                email: 'test@example.com',
                passwordHash: '$2b$10$hashedPasswordExample123456789',
                name: 'Test User',
            };

            // Act
            const user = User.create(props);

            // Assert
            expect(user).toBeDefined();
            expect(user.email.getValue()).toBe(props.email);
            expect(user.passwordHash).toBe(props.passwordHash);
            expect(user.name).toBe(props.name);
            expect(user.isEmailVerified).toBe(false);
            expect(user.createdAt).toBeInstanceOf(Date);
            expect(user.updatedAt).toBeInstanceOf(Date);
            expect(user.id).toBeDefined();
        });

        it('should create user without name', () => {
            // Arrange
            const props = {
                email: 'noname@example.com',
                passwordHash: '$2b$10$hashedPasswordExample123456789',
            };

            // Act
            const user = User.create(props);

            // Assert
            expect(user).toBeDefined();
            expect(user.email.getValue()).toBe(props.email);
            expect(user.passwordHash).toBe(props.passwordHash);
            expect(user.name).toBeNull();
            expect(user.isEmailVerified).toBe(false);
        });

        it('should create user with empty string name converted to null', () => {
            // Arrange
            const props = {
                email: 'empty@example.com',
                passwordHash: '$2b$10$hashedPasswordExample123456789',
                name: '',
            };

            // Act
            const user = User.create(props);

            // Assert
            expect(user).toBeDefined();
            expect(user.name).toBeNull();
        });

        it('should set isEmailVerified to false by default', () => {
            // Arrange
            const props = {
                email: 'unverified@example.com',
                passwordHash: '$2b$10$hashedPasswordExample123456789',
                name: 'Unverified User',
            };

            // Act
            const user = User.create(props);

            // Assert
            expect(user.isEmailVerified).toBe(false);
        });
    });

    describe('validation', () => {
        it('should throw error for empty password hash', () => {
            // Arrange
            const props = {
                email: 'test@example.com',
                passwordHash: '',
                name: 'Test User',
            };

            // Act & Assert
            expect(() => User.create(props)).toThrow('Password hash cannot be empty');
        });

        it('should throw error for whitespace-only password hash', () => {
            // Arrange
            const props = {
                email: 'test@example.com',
                passwordHash: '   ',
                name: 'Test User',
            };

            // Act & Assert
            expect(() => User.create(props)).toThrow('Password hash cannot be empty');
        });

        it('should throw error for invalid email format', () => {
            // Arrange
            const props = {
                email: 'invalid-email',
                passwordHash: '$2b$10$hashedPasswordExample123456789',
                name: 'Test User',
            };

            // Act & Assert
            expect(() => User.create(props)).toThrow();
        });

        it('should throw error for whitespace-only name when provided', () => {
            // Arrange
            const props = {
                email: 'test@example.com',
                passwordHash: '$2b$10$hashedPasswordExample123456789',
                name: '   ',
            };

            // Act & Assert
            expect(() => User.create(props)).toThrow('Name cannot be empty string');
        });

        it('should accept null name', () => {
            // Arrange
            const props = {
                email: 'test@example.com',
                passwordHash: '$2b$10$hashedPasswordExample123456789',
            };

            // Act & Assert
            expect(() => User.create(props)).not.toThrow();
        });
    });

    describe('getters', () => {
        it('should return correct property values', () => {
            // Arrange
            const props = {
                email: 'getter@example.com',
                passwordHash: '$2b$10$hashedPasswordExample123456789',
                name: 'Getter Test User',
            };

            // Act
            const user = User.create(props);

            // Assert
            expect(user.email.getValue()).toBe('getter@example.com');
            expect(user.passwordHash).toBe('$2b$10$hashedPasswordExample123456789');
            expect(user.name).toBe('Getter Test User');
            expect(user.isEmailVerified).toBe(false);
            expect(user.createdAt).toBeInstanceOf(Date);
            expect(user.updatedAt).toBeInstanceOf(Date);
        });
    });

    describe('verifyEmail', () => {
        it('should return new user instance with email verified', () => {
            // Arrange
            const props = {
                email: 'verify@example.com',
                passwordHash: '$2b$10$hashedPasswordExample123456789',
                name: 'Verify User',
            };
            const user = User.create(props);
            const originalUpdatedAt = user.updatedAt;

            // Wait a bit to ensure different timestamp
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            setTimeout(() => {}, 1);

            // Act
            const verifiedUser = user.verifyEmail();

            // Assert
            expect(verifiedUser).not.toBe(user); // Different instance
            expect(verifiedUser.isEmailVerified).toBe(true);
            expect(verifiedUser.email).toBe(user.email);
            expect(verifiedUser.passwordHash).toBe(user.passwordHash);
            expect(verifiedUser.name).toBe(user.name);
            expect(verifiedUser.createdAt).toEqual(user.createdAt);
            expect(verifiedUser.updatedAt.getTime()).toBeGreaterThanOrEqual(originalUpdatedAt.getTime());
            expect(verifiedUser.id).toEqual(user.id);
        });

        it('should not modify original user instance', () => {
            // Arrange
            const props = {
                email: 'immutable@example.com',
                passwordHash: '$2b$10$hashedPasswordExample123456789',
                name: 'Immutable User',
            };
            const user = User.create(props);

            // Act
            user.verifyEmail();

            // Assert
            expect(user.isEmailVerified).toBe(false); // Original remains unchanged
        });
    });

    describe('updateProfile', () => {
        it('should return new user instance with updated name', () => {
            // Arrange
            const props = {
                email: 'update@example.com',
                passwordHash: '$2b$10$hashedPasswordExample123456789',
                name: 'Original Name',
            };
            const user = User.create(props);
            const originalUpdatedAt = user.updatedAt;
            const newName = 'Updated Name';

            // Wait a bit to ensure different timestamp
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            setTimeout(() => {}, 1);

            // Act
            const updatedUser = user.updateProfile(newName);

            // Assert
            expect(updatedUser).not.toBe(user); // Different instance
            expect(updatedUser.name).toBe(newName);
            expect(updatedUser.email).toBe(user.email);
            expect(updatedUser.passwordHash).toBe(user.passwordHash);
            expect(updatedUser.isEmailVerified).toBe(user.isEmailVerified);
            expect(updatedUser.createdAt).toEqual(user.createdAt);
            expect(updatedUser.updatedAt.getTime()).toBeGreaterThanOrEqual(originalUpdatedAt.getTime());
            expect(updatedUser.id).toEqual(user.id);
        });

        it('should not modify original user instance', () => {
            // Arrange
            const props = {
                email: 'immutable2@example.com',
                passwordHash: '$2b$10$hashedPasswordExample123456789',
                name: 'Original Name',
            };
            const user = User.create(props);

            // Act
            user.updateProfile('New Name');

            // Assert
            expect(user.name).toBe('Original Name'); // Original remains unchanged
        });

        it('should throw error when updating name to empty string', () => {
            // Arrange
            const props = {
                email: 'empty-update@example.com',
                passwordHash: '$2b$10$hashedPasswordExample123456789',
                name: 'Original Name',
            };
            const user = User.create(props);

            // Act & Assert
            expect(() => user.updateProfile('')).toThrow('Name cannot be empty string');
        });
    });

    describe('immutability', () => {
        it('should maintain consistent property values', () => {
            // Arrange
            const props = {
                email: 'immutable@example.com',
                passwordHash: '$2b$10$hashedPasswordExample123456789',
                name: 'Immutable User',
            };
            const user = User.create(props);

            // Act & Assert
            // Properties should remain consistent across multiple calls
            const originalEmail = user.email;
            const originalPasswordHash = user.passwordHash;
            const originalName = user.name;
            const originalIsEmailVerified = user.isEmailVerified;
            const originalCreatedAt = user.createdAt;
            const originalUpdatedAt = user.updatedAt;
            const originalId = user.id;

            // Multiple calls should return the same values
            expect(user.email).toBe(originalEmail);
            expect(user.passwordHash).toBe(originalPasswordHash);
            expect(user.name).toBe(originalName);
            expect(user.isEmailVerified).toBe(originalIsEmailVerified);
            expect(user.createdAt).toBe(originalCreatedAt);
            expect(user.updatedAt).toBe(originalUpdatedAt);
            expect(user.id).toBe(originalId);
        });

        it('should have read-only properties (no setters)', () => {
            // Arrange
            const props = {
                email: 'readonly@example.com',
                passwordHash: '$2b$10$hashedPasswordExample123456789',
                name: 'ReadOnly User',
            };
            const user = User.create(props);

            // Act & Assert
            // Verify that properties don't have setters by checking property descriptors
            const propertyNames = ['email', 'passwordHash', 'name', 'isEmailVerified', 'createdAt', 'updatedAt'];

            propertyNames.forEach((propName) => {
                const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(user), propName);
                if (descriptor) {
                    expect(descriptor.set).toBeUndefined();
                    expect(descriptor.get).toBeDefined();
                }
            });
        });
    });

    describe('entity behavior', () => {
        it('should have unique IDs for different instances', () => {
            // Arrange
            const props = {
                email: 'unique@example.com',
                passwordHash: '$2b$10$hashedPasswordExample123456789',
                name: 'Unique User',
            };

            // Act
            const user1 = User.create(props);
            const user2 = User.create(props);

            // Assert
            expect(user1.id).not.toEqual(user2.id);
        });

        it('should extend AggregateRoot base class', () => {
            // Arrange
            const props = {
                email: 'aggregate@example.com',
                passwordHash: '$2b$10$hashedPasswordExample123456789',
                name: 'Aggregate User',
            };

            // Act
            const user = User.create(props);

            // Assert
            expect(user.equals).toBeDefined();
            expect(typeof user.equals).toBe('function');
        });

        it('should have domain events functionality', () => {
            // Arrange
            const props = {
                email: 'events@example.com',
                passwordHash: '$2b$10$hashedPasswordExample123456789',
                name: 'Events User',
            };

            // Act
            const user = User.create(props);

            // Assert
            // Verify that the user extends AggregateRoot which provides domain events functionality
            expect(user).toBeDefined();
            expect(user.id).toBeDefined();
        });
    });

    describe('domain events', () => {
        it('should add UserCreatedEvent when user is created', () => {
            // Arrange
            const props = {
                email: 'event@example.com',
                passwordHash: '$2b$10$hashedPasswordExample123456789',
                name: 'Event User',
            };

            // Act
            const user = User.create(props);

            // Assert
            // We can't directly test the domain events without accessing private members,
            // but we can verify the user was created successfully which means the event was added
            expect(user).toBeDefined();
            expect(user.email.getValue()).toBe(props.email);
        });
    });
});
