import { TestBed } from '@angular/core/testing';
import { EmailStateService } from './email.state.service';
import { EmailGateway } from '@calm-mail/frontend-application';
import { FolderId, FolderVm } from '../../model';
import { of, throwError } from 'rxjs';

describe('EmailStateService', () => {
  let service: EmailStateService;
  let mockEmailGateway: jest.Mocked<EmailGateway>;

  beforeEach(() => {
    mockEmailGateway = {
      getEmails: jest.fn()
    } as unknown as jest.Mocked<EmailGateway>;

    TestBed.configureTestingModule({
      providers: [
        EmailStateService,
        { provide: EmailGateway, useValue: mockEmailGateway }
      ]
    });

    service = TestBed.inject(EmailStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadEmailsForFolder', () => {
    it('should set loading state and call the API', () => {
      // Arrange
      const folderId = FolderId.fromString('test-folder-id');
      const mockResponse = {
        emails: [
          {
            id: 'email-1',
            subject: 'Test Email 1',
            from: 'sender1@example.com',
            to: ['recipient1@example.com'],
            cc: [],
            bcc: [],
            body: 'Test body 1',
            processedAt: new Date(),
            read: false,
            isDraft: false,
            folderId: 'test-folder-id'
          }
        ],
        pagination: {
          page: 1,
          limit: 100,
          totalItems: 1,
          totalPages: 1
        }
      };

      mockEmailGateway.getEmails.mockReturnValue(of(mockResponse));

      // Act
      service.loadEmailsForFolder(folderId);

      // Assert
      expect(mockEmailGateway.getEmails).toHaveBeenCalledWith({
        folderId: folderId.toString(),
        limit: 100,
        page: 1
      });
      expect(service.loading()).toBe(false); // After successful API call, loading should be false
      expect(service.data()).toBeTruthy();
      expect(service.data()?.length).toBe(1);
      expect(service.error()).toBeNull();
    });

    it('should handle API errors', () => {
      // Arrange
      const folderId = FolderId.fromString('test-folder-id');
      const errorMessage = 'API Error';
      mockEmailGateway.getEmails.mockReturnValue(throwError(() => errorMessage));

      // Act
      service.loadEmailsForFolder(folderId);

      // Assert
      expect(mockEmailGateway.getEmails).toHaveBeenCalled();
      expect(service.loading()).toBe(false); // After error, loading should be false
      expect(service.data()).toBeNull();
      expect(service.error()).toBe(errorMessage);
    });
  });

  describe('selectFolder', () => {
    it('should set the selected folder', () => {
      // Arrange
      const mockFolder: FolderVm = {
        id: FolderId.fromString('test-folder-id'),
        name: 'inbox',
        displayName: 'Inbox',
        unreadCount: 5,
        totalCount: 10,
        isDefault: true,
        icon: 'mail-outline'
      };

      // Act
      service.selectFolder(mockFolder);

      // Assert
      expect(service.selectedFolder()).toBe(mockFolder);
    });
  });
});
