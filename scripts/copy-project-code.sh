#!/bin/bash

# copy-project-code.sh
# This script finds all TypeScript files (excluding test files, config files, etc.)
# and copies their content to the clipboard.
#
# Usage:
#   ./copy-project-code.sh [path]
#
# Arguments:
#   path - Optional. The directory path to search for TypeScript files.
#          If not provided, the current directory will be used.

# Set default search path to current directory
SEARCH_PATH="."

# Check if a path argument was provided
if [ $# -gt 0 ]; then
    # Verify the provided path exists
    if [ -d "$1" ]; then
        SEARCH_PATH="$1"
    else
        echo "Error: The provided path '$1' is not a valid directory."
        echo "Usage: ./copy-project-code.sh [path]"
        exit 1
    fi
fi

echo "Searching for TypeScript files in: $SEARCH_PATH"
echo "This may take a moment depending on the size of the codebase..."

# Find TypeScript files and copy their content to clipboard
find "$SEARCH_PATH" -name "*.ts" \
    -not -path "*/node_modules/*" \
    -not -name "*.spec.ts" \
    -not -name "index.ts" \
    -not -name "config.ts" \
    -not -path "*/.nx/*" \
    -not -path "*/dist/*" \
    -not -name "index.ts" \
    -not -name "jest.config.ts" \
    -exec sh -c 'echo "=== $1 ==="; node scripts/strip_ts_comments.js "$1"; echo' _ {} \; | pbcopy

echo "Done! TypeScript code has been copied to clipboard."
