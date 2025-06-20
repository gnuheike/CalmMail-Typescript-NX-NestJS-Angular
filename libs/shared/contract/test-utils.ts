import { z } from 'zod';

/**
 * Helper function to check if a Zod validation error contains a specific path
 * @param result - The SafeParseError result from Zod validation
 * @param path - The path to check for in the error
 */
export function expectErrorToContainPath(result: z.SafeParseError<unknown>, path: string): void {
    // Convert path to array for comparison (e.g., 'stats.folderId' -> ['stats', 'folderId'])
    const pathParts = path.split('.');

    // Check if any issue's path contains all parts of the expected path
    const hasMatchingPath = result.error.issues.some((issue) => {
        // Convert issue path to string for easier comparison
        const issuePath = issue.path.join('.');

        // Check if the issue path contains the expected path
        return (
            issuePath.includes(path) ||
            // Also check if individual path parts match (in case of different path formats)
            pathParts.every((part) => issuePath.includes(part))
        );
    });

    expect(hasMatchingPath).toBe(true);
}
