const fs = require('fs');
const ts = require('typescript');

// Get the file path from command-line argument
const filePath = process.argv[2];

// Read the file content
const source = fs.readFileSync(filePath, 'utf8');

// Create a TypeScript source file
const sourceFile = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true);

// Function to strip comments by transforming the AST
function stripComments(sourceFile) {
    const transformer = (context) => (rootNode) => {
        function visit(node) {
            // Skip single-line and multi-line comments
            if (node.kind === ts.SyntaxKind.SingleLineCommentTrivia || node.kind === ts.SyntaxKind.MultiLineCommentTrivia) {
                return undefined;
            }
            return ts.visitEachChild(node, visit, context);
        }

        return ts.visitNode(rootNode, visit);
    };

    const result = ts.transform(sourceFile, [transformer]);
    const printer = ts.createPrinter({ removeComments: true });
    return printer.printFile(result.transformed[0]);
}

// Strip comments and output to stdout
const strippedCode = stripComments(sourceFile);
console.log(strippedCode.replace(/^\s*$\n/gm, '')); // Remove empty lines
