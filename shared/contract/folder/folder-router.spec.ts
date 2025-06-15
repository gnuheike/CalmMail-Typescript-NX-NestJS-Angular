import { folderContract } from './index';
import { z } from 'zod';

describe('Folder Router Contract - API Endpoint Tests', () => {
    it('should define getFolders endpoint with correct method and path', () => {
        const endpoint = folderContract.getFolders;

        expect(endpoint.method).toBe('GET');
        expect(endpoint.path).toBe('/folders');
    });

    it('should define getFolderStats endpoint with correct method and path', () => {
        const endpoint = folderContract.getFolderStats;

        expect(endpoint.method).toBe('GET');
        expect(endpoint.path).toBe('/folders/:folderId/stats');
    });

    it('should define createFolder endpoint with correct method and path', () => {
        const endpoint = folderContract.createFolder;

        expect(endpoint.method).toBe('POST');
        expect(endpoint.path).toBe('/folders');
    });

    it('should include appropriate response status codes for getFolders', () => {
        const endpoint = folderContract.getFolders;

        expect(endpoint.responses).toHaveProperty('200');
        expect(endpoint.responses).toHaveProperty('400');
        expect(endpoint.responses).toHaveProperty('500');
    });

    it('should include appropriate response status codes for getFolderStats', () => {
        const endpoint = folderContract.getFolderStats;

        expect(endpoint.responses).toHaveProperty('200');
        expect(endpoint.responses).toHaveProperty('400');
        expect(endpoint.responses).toHaveProperty('404');
        expect(endpoint.responses).toHaveProperty('500');
    });

    it('should include appropriate response status codes for createFolder', () => {
        const endpoint = folderContract.createFolder;

        expect(endpoint.responses).toHaveProperty('201');
        expect(endpoint.responses).toHaveProperty('400');
        expect(endpoint.responses).toHaveProperty('500');
    });

    it('should use the correct request schema for getFolders', () => {
        const endpoint = folderContract.getFolders;

        // Check that query parameters are defined
        expect(endpoint.query).toBeDefined();
    });

    it('should use the correct request schema for getFolderStats', () => {
        const endpoint = folderContract.getFolderStats;

        // Check that path parameters are defined
        expect(endpoint.pathParams).toBeDefined();

        // Verify the pathParams schema has a folderId property
        const schema = endpoint.pathParams as z.ZodObject<{
            folderId: z.ZodString;
        }>;
        expect(schema.shape).toBeDefined();
        expect(schema.shape.folderId).toBeDefined();
    });

    it('should use the correct request schema for createFolder', () => {
        const endpoint = folderContract.createFolder;

        // Check that body is defined
        expect(endpoint.body).toBeDefined();
    });
});
