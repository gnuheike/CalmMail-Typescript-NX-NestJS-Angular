import { User } from './user.entity';
import { EmailVO, IdVO, UserIdType } from '@calm-mail/shared-domain';

export const mockUser = new User({
    id: IdVO.generate<UserIdType>('UserId'),
    email: EmailVO.create('testuser@example.com'),
    passwordHash: '$2b$10$hashedPasswordExample123456789',
    name: 'Test User',
    isEmailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
});

export const mockUnverifiedUser = new User({
    id: IdVO.generate<UserIdType>('UserId'),
    email: EmailVO.create('unverified@example.com'),
    passwordHash: '$2b$10$hashedPasswordExample123456789',
    name: 'Unverified User',
    isEmailVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
});

export const mockUserWithoutName = new User({
    id: IdVO.generate<UserIdType>('UserId'),
    email: EmailVO.create('noname@example.com'),
    passwordHash: '$2b$10$hashedPasswordExample123456789',
    name: null,
    isEmailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
});
