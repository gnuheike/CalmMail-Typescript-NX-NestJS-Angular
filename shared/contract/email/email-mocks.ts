import { CreateEmailResponse, Email, GetEmailsResponse } from './email.type';
import { createDefaultFolders } from '../folder/folder-mocks';

/**
 * Mock Email Data
 *
 * This file provides mock data for testing email-related functionality.
 * These mocks can be used across tests to ensure consistent test data.
 */

/**
 * Creates a mock email with the given properties
 */
export function createMockEmail(overrides: Partial<Email> = {}): Email {
    // Get default folders to reference a valid folder ID
    const defaultFolders = createDefaultFolders();
    const inboxFolder = defaultFolders[0];

    if (!inboxFolder) throw new Error('No default inbox folder found.');

    return {
        id: 'clq1234567890abcdefghijklm',
        subject: 'Test Email Subject',
        from: 'sender@example.com',
        to: ['recipient@example.com'],
        cc: [],
        bcc: [],
        body: 'This is a test email body.',
        processedAt: new Date(),
        read: false,
        isDraft: false,
        folderId: inboxFolder.id, // Reference a valid folder ID
        ...overrides,
    };
}

/**
 * Creates a mock email in the inbox folder
 */
export function createMockInboxEmail(overrides: Partial<Email> = {}): Email {
    const defaultFolders = createDefaultFolders();
    const inboxFolder = defaultFolders[0]; // First folder is inbox

    if (!inboxFolder) throw new Error('No default inbox folder found.');

    return createMockEmail({
        folderId: inboxFolder.id,
        ...overrides,
    });
}

/**
 * Creates a mock email in the sent folder
 */
export function createMockSentEmail(overrides: Partial<Email> = {}): Email {
    const defaultFolders = createDefaultFolders();
    const sentFolder = defaultFolders[1]; // Second folder is sent

    if (!sentFolder) throw new Error('No default sent folder found.');

    return createMockEmail({
        from: 'user@example.com',
        folderId: sentFolder.id,
        read: true,
        ...overrides,
    });
}

/**
 * Creates a mock draft email
 */
export function createMockDraftEmail(overrides: Partial<Email> = {}): Email {
    const defaultFolders = createDefaultFolders();
    const draftsFolder = defaultFolders[2]; // Third folder is drafts

    if (!draftsFolder) throw new Error('No default drafts folder found.');

    return createMockEmail({
        from: 'user@example.com',
        folderId: draftsFolder.id,
        isDraft: true,
        ...overrides,
    });
}

/**
 * Creates a mock GetEmailsResponse
 */
export function createMockGetEmailsResponse(overrides: Partial<GetEmailsResponse> = {}): GetEmailsResponse {
    return {
        emails: [
            createMockInboxEmail(),
            createMockInboxEmail({
                id: 'clq2345678901abcdefghijklm',
                subject: 'Another Test Email',
            }),
        ],
        pagination: {
            page: 1,
            limit: 20,
            totalItems: 2,
            totalPages: 1,
        },
        ...overrides,
    };
}

/**
 * Creates a mock CreateEmailResponse
 */
export function createMockCreateEmailResponse(overrides: Partial<CreateEmailResponse> = {}): CreateEmailResponse {
    return {
        email: createMockEmail(),
        ...overrides,
    };
}

/**
 * Creates a set of mock emails for a specific folder
 */
export function createMockEmailsForFolder(folderId: string, count = 3): Email[] {
    return Array.from({ length: count }, (_, index) =>
        createMockEmail({
            id: `clq${Date.now().toString(36)}${Math.random().toString(36).substring(2, 7)}${index}`,
            subject: `Email ${index + 1} in folder`,
            folderId,
        }),
    );
}
