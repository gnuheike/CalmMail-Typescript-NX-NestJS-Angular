/**
 * CreateAttachmentRequest
 *
 * Domain interface for creating new attachments.
 * Used when composing emails with attachments.
 */
export interface CreateAttachmentRequest {
    filename: string;
    contentType: string;
    size: number;
    contentId?: string;
    content: string | { storageReference: string };
}
