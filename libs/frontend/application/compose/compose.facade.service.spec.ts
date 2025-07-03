import { TestBed } from '@angular/core/testing';
import { ComposeFacade } from './compose.facade.service';
import { SendEmailCommandHandler } from './commands/send-email/send-email.command-handler';
import { SaveDraftCommandHandler } from './commands/save-draft/save-draft.command-handler';
import { UpdateDraftCommandHandler } from './commands/update-draft/update-draft.command-handler';
import { SendEmailCommand } from './commands/send-email/send-email.command';
import { SaveDraftCommand } from './commands/save-draft/save-draft.command';
import { UpdateDraftCommand } from './commands/update-draft/update-draft.command';
import { CreateAttachmentRequest } from '@calm-mail/frontend-domain';

describe('ComposeFacade', () => {
    let service: ComposeFacade;
    let sendEmailCommandHandler: jest.Mocked<SendEmailCommandHandler>;
    let saveDraftCommandHandler: jest.Mocked<SaveDraftCommandHandler>;
    let updateDraftCommandHandler: jest.Mocked<UpdateDraftCommandHandler>;

    beforeEach(() => {
        const sendEmailSpy = {
            commandType: '[Compose] Send Email',
            execute: jest.fn()
        } as unknown as jest.Mocked<SendEmailCommandHandler>;

        const saveDraftSpy = {
            commandType: '[Compose] Save Draft',
            execute: jest.fn()
        } as unknown as jest.Mocked<SaveDraftCommandHandler>;

        const updateDraftSpy = {
            commandType: '[Compose] Update Draft',
            execute: jest.fn()
        } as unknown as jest.Mocked<UpdateDraftCommandHandler>;

        TestBed.configureTestingModule({
            providers: [
                ComposeFacade,
                { provide: SendEmailCommandHandler, useValue: sendEmailSpy },
                { provide: SaveDraftCommandHandler, useValue: saveDraftSpy },
                { provide: UpdateDraftCommandHandler, useValue: updateDraftSpy },
            ],
        });

        service = TestBed.inject(ComposeFacade);
        sendEmailCommandHandler = TestBed.inject(SendEmailCommandHandler) as jest.Mocked<SendEmailCommandHandler>;
        saveDraftCommandHandler = TestBed.inject(SaveDraftCommandHandler) as jest.Mocked<SaveDraftCommandHandler>;
        updateDraftCommandHandler = TestBed.inject(UpdateDraftCommandHandler) as jest.Mocked<UpdateDraftCommandHandler>;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('sendEmail', () => {
        it('should send email with required parameters', async () => {
            // Arrange
            const accountId = 'test-account-id';
            const from = 'sender@test.com';
            const to = ['recipient@test.com'];
            const subject = 'Test Subject';
            const body = 'Test Body';

            const mockEmailEntity = {} as any; // Mock EmailEntity
            sendEmailCommandHandler.execute.mockResolvedValue(mockEmailEntity);

            // Act
            await service.sendEmail(accountId, from, to, subject, body);

            // Assert
            expect(sendEmailCommandHandler.execute).toHaveBeenCalledTimes(1);
            const command = sendEmailCommandHandler.execute.mock.calls[0]?.[0] as SendEmailCommand;
            expect(command).toBeInstanceOf(SendEmailCommand);
            expect(command.payload.accountId).toBe(accountId);
            expect(command.payload.from).toBe(from);
            expect(command.payload.to).toEqual(to);
            expect(command.payload.subject).toBe(subject);
            expect(command.payload.body).toBe(body);
            expect(command.payload.isDraft).toBe(false);
            expect(command.payload.read).toBe(true);
            expect(command.payload.cc).toEqual([]);
            expect(command.payload.bcc).toEqual([]);
            expect(command.payload.attachments).toEqual([]);
        });

        it('should send email with all optional parameters', async () => {
            // Arrange
            const accountId = 'test-account-id';
            const from = 'sender@test.com';
            const to = ['recipient@test.com'];
            const subject = 'Test Subject';
            const body = 'Test Body';
            const cc = ['cc@test.com'];
            const bcc = ['bcc@test.com'];
            const attachments: CreateAttachmentRequest[] = [{
                filename: 'test.pdf',
                contentType: 'application/pdf',
                size: 1024,
                content: 'base64content'
            }];
            const threadId = 'test-thread-id';

            const mockEmailEntity = {} as any; // Mock EmailEntity
            sendEmailCommandHandler.execute.mockResolvedValue(mockEmailEntity);

            // Act
            await service.sendEmail(accountId, from, to, subject, body, cc, bcc, attachments, threadId);

            // Assert
            expect(sendEmailCommandHandler.execute).toHaveBeenCalledTimes(1);
            const command = sendEmailCommandHandler.execute.mock.calls[0]?.[0] as SendEmailCommand;
            expect(command.payload.cc).toEqual(cc);
            expect(command.payload.bcc).toEqual(bcc);
            expect(command.payload.attachments).toEqual(attachments);
            expect(command.payload.threadId).toBe(threadId);
        });

        it('should handle errors from command handler', async () => {
            // Arrange
            const accountId = 'test-account-id';
            const from = 'sender@test.com';
            const to = ['recipient@test.com'];
            const subject = 'Test Subject';
            const body = 'Test Body';

            sendEmailCommandHandler.execute.mockRejectedValue(new Error('Send failed'));

            // Act & Assert
            await expect(service.sendEmail(accountId, from, to, subject, body))
                .rejects.toThrow('Send failed');
        });
    });

    describe('saveDraft', () => {
        it('should save draft with required parameters', async () => {
            // Arrange
            const accountId = 'test-account-id';
            const from = 'sender@test.com';
            const to = ['recipient@test.com'];
            const subject = 'Test Subject';
            const body = 'Test Body';

            saveDraftCommandHandler.execute.mockResolvedValue(undefined);

            // Act
            await service.saveDraft(accountId, from, to, subject, body);

            // Assert
            expect(saveDraftCommandHandler.execute).toHaveBeenCalledTimes(1);
            const command = saveDraftCommandHandler.execute.mock.calls[0]?.[0] as SaveDraftCommand;
            expect(command).toBeInstanceOf(SaveDraftCommand);
            expect(command.payload.accountId).toBe(accountId);
            expect(command.payload.from).toBe(from);
            expect(command.payload.to).toEqual(to);
            expect(command.payload.subject).toBe(subject);
            expect(command.payload.body).toBe(body);
            expect(command.payload.isDraft).toBe(true);
            expect(command.payload.read).toBe(true);
            expect(command.payload.sentAt).toBeNull();
            expect(command.payload.cc).toEqual([]);
            expect(command.payload.bcc).toEqual([]);
            expect(command.payload.attachments).toEqual([]);
        });

        it('should save draft with all optional parameters', async () => {
            // Arrange
            const accountId = 'test-account-id';
            const from = 'sender@test.com';
            const to = ['recipient@test.com'];
            const subject = 'Test Subject';
            const body = 'Test Body';
            const cc = ['cc@test.com'];
            const bcc = ['bcc@test.com'];
            const attachments: CreateAttachmentRequest[] = [{
                filename: 'draft.pdf',
                contentType: 'application/pdf',
                size: 2048,
                content: 'base64content'
            }];
            const threadId = 'test-thread-id';

            saveDraftCommandHandler.execute.mockResolvedValue(undefined);

            // Act
            await service.saveDraft(accountId, from, to, subject, body, cc, bcc, attachments, threadId);

            // Assert
            expect(saveDraftCommandHandler.execute).toHaveBeenCalledTimes(1);
            const command = saveDraftCommandHandler.execute.mock.calls[0]?.[0] as SaveDraftCommand;
            expect(command.payload.cc).toEqual(cc);
            expect(command.payload.bcc).toEqual(bcc);
            expect(command.payload.attachments).toEqual(attachments);
            expect(command.payload.threadId).toBe(threadId);
        });

        it('should handle errors from command handler', async () => {
            // Arrange
            const accountId = 'test-account-id';
            const from = 'sender@test.com';
            const to = ['recipient@test.com'];
            const subject = 'Test Subject';
            const body = 'Test Body';

            saveDraftCommandHandler.execute.mockRejectedValue(new Error('Save failed'));

            // Act & Assert
            await expect(service.saveDraft(accountId, from, to, subject, body))
                .rejects.toThrow('Save failed');
        });
    });

    describe('updateDraft', () => {
        it('should update draft with provided updates', async () => {
            // Arrange
            const id = 'test-draft-id';
            const updates = {
                to: ['updated@test.com'],
                subject: 'Updated Subject',
                body: 'Updated Body',
                read: false
            };

            updateDraftCommandHandler.execute.mockResolvedValue(undefined);

            // Act
            await service.updateDraft(id, updates);

            // Assert
            expect(updateDraftCommandHandler.execute).toHaveBeenCalledTimes(1);
            const command = updateDraftCommandHandler.execute.mock.calls[0]?.[0] as UpdateDraftCommand;
            expect(command).toBeInstanceOf(UpdateDraftCommand);
            expect(command.id).toBe(id);
            expect(command.payload).toEqual(updates);
        });

        it('should update draft with partial updates', async () => {
            // Arrange
            const id = 'test-draft-id';
            const updates = {
                subject: 'Only Subject Updated'
            };

            updateDraftCommandHandler.execute.mockResolvedValue(undefined);

            // Act
            await service.updateDraft(id, updates);

            // Assert
            expect(updateDraftCommandHandler.execute).toHaveBeenCalledTimes(1);
            const command = updateDraftCommandHandler.execute.mock.calls[0]?.[0] as UpdateDraftCommand;
            expect(command.id).toBe(id);
            expect(command.payload).toEqual(updates);
        });

        it('should handle errors from command handler', async () => {
            // Arrange
            const id = 'test-draft-id';
            const updates = { subject: 'Updated Subject' };

            updateDraftCommandHandler.execute.mockRejectedValue(new Error('Update failed'));

            // Act & Assert
            await expect(service.updateDraft(id, updates))
                .rejects.toThrow('Update failed');
        });
    });
});
