#!/bin/bash

# copy-project-code.sh
# This script finds all TypeScript files (excluding test files, config files, etc.)
# and copies their content to the clipboard.
#
# Usage:
#   ./copy-project-code.sh [path] [--context=backend|frontend|shared]
#
# Arguments:
#   path - Optional. The directory path to search for TypeScript files.
#          If not provided, the current directory will be used.
#   --context - Optional. Filter files based on context:
#               backend: only apps/server and libs/backend
#               frontend: only apps/web and libs/frontend
#               shared: only libs/shared
#               If not provided, no additional filters are applied.

# Set default values
SEARCH_PATH="."
CONTEXT=""

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --context=*)
            CONTEXT="${1#*=}"
            shift
            ;;
        --context)
            if [[ -n "$2" && "$2" != --* ]]; then
                CONTEXT="$2"
                shift 2
            else
                echo "Error: --context requires a value (backend|frontend|shared)"
                echo "Usage: ./copy-project-code.sh [path] [--context=backend|frontend|shared]"
                exit 1
            fi
            ;;
        -*)
            echo "Error: Unknown option $1"
            echo "Usage: ./copy-project-code.sh [path] [--context=backend|frontend|shared]"
            exit 1
            ;;
        *)
            # Verify the provided path exists
            if [ -d "$1" ]; then
                SEARCH_PATH="$1"
            else
                echo "Error: The provided path '$1' is not a valid directory."
                echo "Usage: ./copy-project-code.sh [path] [--context=backend|frontend|shared]"
                exit 1
            fi
            shift
            ;;
    esac
done

# Apply context-based filtering
if [ -n "$CONTEXT" ]; then
    case "$CONTEXT" in
        backend)
            if [ "$SEARCH_PATH" = "." ]; then
                SEARCH_PATHS=("apps/server" "libs/backend")
            else
                echo "Error: Context filtering can only be used with default search path (current directory)"
                echo "Usage: ./copy-project-code.sh [--context=backend|frontend|shared]"
                exit 1
            fi
            ;;
        frontend)
            if [ "$SEARCH_PATH" = "." ]; then
                SEARCH_PATHS=("apps/web" "libs/frontend")
            else
                echo "Error: Context filtering can only be used with default search path (current directory)"
                echo "Usage: ./copy-project-code.sh [--context=backend|frontend|shared]"
                exit 1
            fi
            ;;
        shared)
            if [ "$SEARCH_PATH" = "." ]; then
                SEARCH_PATHS=("libs/shared")
            else
                echo "Error: Context filtering can only be used with default search path (current directory)"
                echo "Usage: ./copy-project-code.sh [--context=backend|frontend|shared]"
                exit 1
            fi
            ;;
        *)
            echo "Error: Invalid context '$CONTEXT'. Valid options are: backend, frontend, shared"
            echo "Usage: ./copy-project-code.sh [path] [--context=backend|frontend|shared]"
            exit 1
            ;;
    esac
else
    SEARCH_PATHS=("$SEARCH_PATH")
fi

# Display search paths
if [ -n "$CONTEXT" ]; then
    echo "Searching for TypeScript files with context '$CONTEXT' in:"
    for path in "${SEARCH_PATHS[@]}"; do
        echo "  - $path"
    done
else
    echo "Searching for TypeScript files in: ${SEARCH_PATHS[0]}"
fi
echo "This may take a moment depending on the size of the codebase..."

# Find TypeScript files and copy their content to clipboard
{
    for search_path in "${SEARCH_PATHS[@]}"; do
        if [ -d "$search_path" ]; then
            find "$search_path" -name "*.ts" \
                -not -path "*/node_modules/*" \
                -not -name "*.spec.ts" \
                -not -name "index.ts" \
                -not -name "config.ts" \
                -not -path "*/.nx/*" \
                -not -path "*/dist/*" \
                -not -name "*.mock.ts" \
                -not -name "jest.config.ts" \
                -exec sh -c 'echo "=== $1 ==="; node scripts/strip_ts_comments.js "$1"; echo' _ {} \;
        else
            echo "Warning: Directory '$search_path' does not exist, skipping..."
        fi
    done
} | pbcopy

echo "Done! TypeScript code has been copied to clipboard."
