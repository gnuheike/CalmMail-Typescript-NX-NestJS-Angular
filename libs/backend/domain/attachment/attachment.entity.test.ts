import { AttachmentEntity } from './attachment.entity';

describe('AttachmentEntity', () => {
    describe('create', () => {
        it('should create a valid attachment entity', () => {
            // Arrange
            const props = {
                filename: 'document.pdf',
                contentType: 'application/pdf',
                size: 1024000,
                contentId: 'content-123',
                content: 'base64encodedcontent...'
            };

            // Act
            const attachment = AttachmentEntity.create(props);

            // Assert
            expect(attachment).toBeDefined();
            expect(attachment.filename).toBe(props.filename);
            expect(attachment.contentType).toBe(props.contentType);
            expect(attachment.size).toBe(props.size);
            expect(attachment.contentId).toBe(props.contentId);
            expect(attachment.content).toBe(props.content);
            expect(attachment.createdAt).toBeInstanceOf(Date);
            expect(attachment.updatedAt).toBeInstanceOf(Date);
            expect(attachment.id).toBeDefined();
        });

        it('should create attachment without optional fields', () => {
            // Arrange
            const props = {
                filename: 'image.jpg',
                contentType: 'image/jpeg',
                size: 512000
            };

            // Act
            const attachment = AttachmentEntity.create(props);

            // Assert
            expect(attachment).toBeDefined();
            expect(attachment.filename).toBe(props.filename);
            expect(attachment.contentType).toBe(props.contentType);
            expect(attachment.size).toBe(props.size);
            expect(attachment.contentId).toBeUndefined();
            expect(attachment.content).toBeUndefined();
        });

        it('should create attachment with storage reference', () => {
            // Arrange
            const props = {
                filename: 'video.mp4',
                contentType: 'video/mp4',
                size: 5000000,
                content: { storageReference: 'storage://bucket/video.mp4' }
            };

            // Act
            const attachment = AttachmentEntity.create(props);

            // Assert
            expect(attachment).toBeDefined();
            expect(attachment.content).toEqual({ storageReference: 'storage://bucket/video.mp4' });
        });
    });

    describe('validation', () => {
        it('should throw error for empty filename', () => {
            // Arrange
            const props = {
                filename: '',
                contentType: 'application/pdf',
                size: 1024000
            };

            // Act & Assert
            expect(() => AttachmentEntity.create(props)).toThrow('Filename cannot be empty');
        });

        it('should throw error for whitespace-only filename', () => {
            // Arrange
            const props = {
                filename: '   ',
                contentType: 'application/pdf',
                size: 1024000
            };

            // Act & Assert
            expect(() => AttachmentEntity.create(props)).toThrow('Filename cannot be empty');
        });

        it('should throw error for empty content type', () => {
            // Arrange
            const props = {
                filename: 'document.pdf',
                contentType: '',
                size: 1024000
            };

            // Act & Assert
            expect(() => AttachmentEntity.create(props)).toThrow('Content type cannot be empty');
        });

        it('should throw error for whitespace-only content type', () => {
            // Arrange
            const props = {
                filename: 'document.pdf',
                contentType: '   ',
                size: 1024000
            };

            // Act & Assert
            expect(() => AttachmentEntity.create(props)).toThrow('Content type cannot be empty');
        });

        it('should throw error for negative size', () => {
            // Arrange
            const props = {
                filename: 'document.pdf',
                contentType: 'application/pdf',
                size: -1
            };

            // Act & Assert
            expect(() => AttachmentEntity.create(props)).toThrow('Size cannot be negative');
        });

        it('should throw error for size exceeding 25MB limit', () => {
            // Arrange
            const props = {
                filename: 'large-file.zip',
                contentType: 'application/zip',
                size: 26 * 1024 * 1024 // 26MB
            };

            // Act & Assert
            expect(() => AttachmentEntity.create(props)).toThrow('Attachment size cannot exceed 25MB');
        });

        it('should accept size at 25MB limit', () => {
            // Arrange
            const props = {
                filename: 'max-size-file.zip',
                contentType: 'application/zip',
                size: 25 * 1024 * 1024 // Exactly 25MB
            };

            // Act & Assert
            expect(() => AttachmentEntity.create(props)).not.toThrow();
        });
    });

    describe('getters', () => {
        it('should return correct property values', () => {
            // Arrange
            const props = {
                filename: 'test.txt',
                contentType: 'text/plain',
                size: 1024,
                contentId: 'test-content-id',
                content: 'test content'
            };

            // Act
            const attachment = AttachmentEntity.create(props);

            // Assert
            expect(attachment.filename).toBe('test.txt');
            expect(attachment.contentType).toBe('text/plain');
            expect(attachment.size).toBe(1024);
            expect(attachment.contentId).toBe('test-content-id');
            expect(attachment.content).toBe('test content');
        });
    });

    describe('immutability', () => {
        it('should maintain consistent property values', () => {
            // Arrange
            const props = {
                filename: 'document.pdf',
                contentType: 'application/pdf',
                size: 1024000,
                contentId: 'test-id',
                content: 'test-content'
            };
            const attachment = AttachmentEntity.create(props);

            // Act & Assert
            // Properties should remain consistent across multiple calls
            const originalFilename = attachment.filename;
            const originalContentType = attachment.contentType;
            const originalSize = attachment.size;
            const originalContentId = attachment.contentId;
            const originalContent = attachment.content;
            const originalCreatedAt = attachment.createdAt;
            const originalUpdatedAt = attachment.updatedAt;
            const originalId = attachment.id;

            // Multiple calls should return the same values
            expect(attachment.filename).toBe(originalFilename);
            expect(attachment.contentType).toBe(originalContentType);
            expect(attachment.size).toBe(originalSize);
            expect(attachment.contentId).toBe(originalContentId);
            expect(attachment.content).toBe(originalContent);
            expect(attachment.createdAt).toBe(originalCreatedAt);
            expect(attachment.updatedAt).toBe(originalUpdatedAt);
            expect(attachment.id).toBe(originalId);
        });

        it('should have read-only properties (no setters)', () => {
            // Arrange
            const props = {
                filename: 'document.pdf',
                contentType: 'application/pdf',
                size: 1024000
            };
            const attachment = AttachmentEntity.create(props);

            // Act & Assert
            // Verify that properties don't have setters by checking property descriptors
            const propertyNames = ['filename', 'contentType', 'size', 'contentId', 'content', 'createdAt', 'updatedAt'];

            propertyNames.forEach(propName => {
                const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(attachment), propName);
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
                filename: 'document.pdf',
                contentType: 'application/pdf',
                size: 1024000
            };

            // Act
            const attachment1 = AttachmentEntity.create(props);
            const attachment2 = AttachmentEntity.create(props);

            // Assert
            expect(attachment1.id).not.toEqual(attachment2.id);
        });

        it('should extend Entity base class', () => {
            // Arrange
            const props = {
                filename: 'document.pdf',
                contentType: 'application/pdf',
                size: 1024000
            };

            // Act
            const attachment = AttachmentEntity.create(props);

            // Assert
            expect(attachment.equals).toBeDefined();
            expect(typeof attachment.equals).toBe('function');
        });
    });
});
