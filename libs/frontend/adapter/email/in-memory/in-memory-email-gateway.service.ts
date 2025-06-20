import { Injectable } from '@angular/core';
import { EmailGateway } from '@calm-mail/frontend-core-ports';
import { BehaviorSubject, Observable } from 'rxjs';
import {
    CreateEmailRequest,
    CreateEmailResponse,
    createMockDraftEmail,
    createMockEmail,
    createMockInboxEmail,
    createMockSentEmail,
    Email,
    GetEmailsRequest,
    GetEmailsResponse
} from '@calm-mail/contract';
import { simulateNetworkRequestObservable } from '../../util/simulation.util';

/**
 * Mock implementation of HttpEmailGateway
 *
 * Provides mock implementations of email-related gateway methods
 * for development and testing purposes.
 */
@Injectable()
export class InMemoryEmailGateway extends EmailGateway {
    /**
     * Subject containing the current email list
     * @private
     */
    private readonly emailsSubject = new BehaviorSubject<Email[]>([]);

    /**
     * Constructor initializes the emails using the factory functions
     */
    constructor() {
        super();
        // Generate consistent mock data on initialization
        const emails = this.createInitialEmails();
        this.emailsSubject.next(emails);
    }

    /**
     * Get the current email list
     */
    private get emails(): Email[] {
        return this.emailsSubject.getValue();
    }

    /**
     * Get emails with optional filtering
     *
     * @param input Request with filtering and pagination options
     * @returns Observable with the emails response
     */
    public getEmails(input: GetEmailsRequest): Observable<GetEmailsResponse> {
        return simulateNetworkRequestObservable(() => {
            const folderId = input.folderId;
            const page = input.page || 1;
            const limit = input.limit || 20;

            // Get emails with optional filtering
            const allEmails = this.getFilteredEmails(folderId);

            // Apply pagination
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const paginatedEmails = allEmails.slice(startIndex, endIndex);

            return {
                emails: paginatedEmails,
                pagination: {
                    page,
                    limit,
                    totalItems: allEmails.length,
                    totalPages: Math.ceil(allEmails.length / limit),
                },
            };
        });
    }

    /**
     * Create a new email
     *
     * @param input Request with email creation details
     * @returns Observable with the created email response
     */
    public createEmail(input: CreateEmailRequest): Observable<CreateEmailResponse> {
        return simulateNetworkRequestObservable(() => {
            // Determine which factory function to use based on the email type
            const newEmail = this._createEmail(input);
            // Add the email to the state
            const createdEmail = this.addEmail(newEmail);

            return {
                email: createdEmail,
            };
        });
    }

    /**
     * Creates the initial set of mock emails
     * @returns Array of mock emails
     * @private
     */
    // eslint-disable-next-line max-lines-per-function
    private createInitialEmails(): Email[] {
        return [
            // Inbox emails
            this.createInboxEmail(
                'clq1234567890email00000001',
                'Welcome to CalmMail',
                'support@calmmail.com',
                'Thank you for choosing CalmMail. We hope you enjoy our calm and focused email experience.',
                false,
            ),
            this.createInboxEmail(
                'clq1234567890email00000002',
                'Meeting Tomorrow',
                'manager@company.com',
                "Let's meet tomorrow at 10 AM to discuss the project progress.",
                true,
                ['team@company.com'],
            ),
            this.createInboxEmail(
                'clq1234567890email00000003',
                'Vacation Plans',
                'friend@personal.com',
                'Hey, I was thinking about our vacation plans. How about we go to the beach next month?',
                false,
            ),

            // Sent emails
            this.createSentEmail(
                'clq1234567890email00000004',
                'Re: Project Update',
                "I've completed the tasks you assigned. Please review and let me know if any changes are needed.",
                ['colleague@company.com'],
            ),
            this.createSentEmail('clq1234567890email00000005', 'Dinner Invitation', 'Would you like to join us for dinner this Saturday at 7 PM?', [
                'friend1@personal.com',
                'friend2@personal.com',
            ]),

            // Draft emails
            this.createDraftEmail('clq1234567890email00000006', 'Project Proposal', 'Here is the project proposal we discussed. [DRAFT - NOT COMPLETE]', [
                'client@company.com',
            ]),

            // Work folder emails
            this.createWorkEmail(
                'clq1234567890email00000007',
                'Quarterly Report',
                'finance@company.com',
                'Please find attached the quarterly financial report.',
                false,
                ['team@company.com'],
            ),
            this.createWorkEmail(
                'clq1234567890email00000008',
                'New Project Opportunity',
                'sales@company.com',
                "We have a new project opportunity with a potential client. Let's discuss it in our next meeting.",
                true,
            ),

            // Family folder emails
            this.createFamilyEmail(
                'clq1234567890email00000009',
                'Family Reunion',
                'relative@family.com',
                "We're planning a family reunion next month. Please let me know if you can attend.",
                false,
                ['family@group.com'],
            ),
        ];
    }

    /**
     * Helper method to create inbox emails
     */
    private createInboxEmail(id: string, subject: string, from: string, body: string, read: boolean, cc: string[] = []): Email {
        return createMockInboxEmail({
            id,
            subject,
            from,
            to: ['user@example.com'],
            cc,
            body,
            processedAt: new Date('2023-06-01T10:00:00Z'),
            read,
            folderId: 'clq1234567890inbox000000001',
        });
    }

    /**
     * Helper method to create sent emails
     */
    private createSentEmail(id: string, subject: string, body: string, to: string[]): Email {
        return createMockSentEmail({
            id,
            subject,
            from: 'user@example.com',
            to,
            body,
            processedAt: new Date('2023-06-01T11:45:00Z'),
            folderId: 'clq1234567890sent0000000001',
        });
    }

    /**
     * Helper method to create draft emails
     */
    private createDraftEmail(id: string, subject: string, body: string, to: string[]): Email {
        return createMockDraftEmail({
            id,
            subject,
            from: 'user@example.com',
            to,
            body,
            processedAt: new Date('2023-06-03T15:10:00Z'),
            folderId: 'clq1234567890drafts00000001',
        });
    }

    /**
     * Helper method to create work folder emails
     */
    private createWorkEmail(id: string, subject: string, from: string, body: string, read: boolean, cc: string[] = []): Email {
        return createMockEmail({
            id,
            subject,
            from,
            to: ['user@example.com'],
            cc,
            body,
            processedAt: new Date('2023-06-01T13:25:00Z'),
            read,
            folderId: 'clq1234567890work0000000001',
        });
    }

    /**
     * Helper method to create family folder emails
     */
    private createFamilyEmail(id: string, subject: string, from: string, body: string, read: boolean, cc: string[] = []): Email {
        return createMockEmail({
            id,
            subject,
            from,
            to: ['user@example.com'],
            cc,
            body,
            processedAt: new Date('2023-06-03T10:55:00Z'),
            read,
            folderId: 'clq1234567890family00000001',
        });
    }

    /**
     * Get an email by its ID
     * @param id The email ID
     * @returns The email or undefined if not found
     * @private
     */
    private getEmailById(id: string): Email | undefined {
        return this.emails.find((email) => email.id === id);
    }

    /**
     * Add a new email to the state
     * @param email The email to add
     * @returns The added email
     * @private
     */
    private addEmail(email: Email): Email {
        const newEmails = [...this.emails, email];
        this.emailsSubject.next(newEmails);
        return email;
    }

    /**
     * Get emails with optional filtering
     * @param folderId Optional folder ID to filter emails by
     * @param includeRead Whether to include read emails
     * @param includeDrafts Whether to include draft emails
     * @returns Filtered list of emails
     * @private
     */
    private getFilteredEmails(folderId?: string, includeRead = true, includeDrafts = true): Email[] {
        return this.emails.filter((email) => {
            // Filter by folder if specified
            if (folderId && email.folderId !== folderId) {
                return false;
            }

            // Filter by read status if needed
            if (!includeRead && email.read) {
                return false;
            }

            // Filter by draft status if needed
            return !(!includeDrafts && email.isDraft);
        });
    }

    private _createEmail(input: CreateEmailRequest): Email {
        // Generate a unique ID for the email
        const emailId = this.generateEmailId();

        if (input.saveAsDraft) {
            return this.createDraftEmailFromRequest(input, emailId);
        }

        if (input.from === 'user@example.com') {
            return this.createSentEmailFromRequest(input, emailId);
        }

        return this.createRegularEmailFromRequest(input, emailId);
    }

    /**
     * Generates a unique ID for an email
     * @returns A unique ID string
     * @private
     */
    private generateEmailId(): string {
        return `clq${Date.now().toString(36)}${Math.random().toString(36).substring(2, 7)}`;
    }

    /**
     * Creates a draft email from a request
     * @param input The email creation request
     * @param emailId The generated email ID
     * @returns A draft email
     * @private
     */
    private createDraftEmailFromRequest(input: CreateEmailRequest, emailId: string): Email {
        return createMockDraftEmail({
            id: emailId,
            subject: input.subject,
            from: input.from,
            to: input.to,
            cc: input.cc || [],
            bcc: input.bcc || [],
            body: input.body,
            processedAt: new Date(),
            folderId: input.folderId || 'clq1234567890drafts00000001',
            threadId: input.threadId,
        });
    }

    /**
     * Creates a sent email from a request
     * @param input The email creation request
     * @param emailId The generated email ID
     * @returns A sent email
     * @private
     */
    private createSentEmailFromRequest(input: CreateEmailRequest, emailId: string): Email {
        return createMockSentEmail({
            id: emailId,
            subject: input.subject,
            from: input.from,
            to: input.to,
            cc: input.cc || [],
            bcc: input.bcc || [],
            body: input.body,
            processedAt: new Date(),
            folderId: input.folderId || 'clq1234567890sent0000000001',
            threadId: input.threadId,
        });
    }

    /**
     * Creates a regular email from a request
     * @param input The email creation request
     * @param emailId The generated email ID
     * @returns A regular email
     * @private
     */
    private createRegularEmailFromRequest(input: CreateEmailRequest, emailId: string): Email {
        return createMockEmail({
            id: emailId,
            subject: input.subject,
            from: input.from,
            to: input.to,
            cc: input.cc || [],
            bcc: input.bcc || [],
            body: input.body,
            processedAt: new Date(),
            read: false,
            isDraft: input.saveAsDraft || false,
            folderId: input.folderId || 'clq1234567890inbox000000001',
            threadId: input.threadId,
        });
    }
}
