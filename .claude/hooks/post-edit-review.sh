#!/bin/bash
# Post-edit review hook - runs after every Edit/Write operation
# Acts as the "always-on critic" subagent by catching issues immediately

set -euo pipefail

# Read tool use details from stdin
INPUT=$(cat)

# Extract file path from the tool input JSON
FILE_PATH=$(echo "$INPUT" | python3 -c "
import json, sys
data = json.load(sys.stdin)
# Handle both Edit and Write tool schemas
path = data.get('file_path', data.get('filePath', ''))
print(path)
" 2>/dev/null || echo "")

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Only check TypeScript/JavaScript/TSX/JSX files
case "$FILE_PATH" in
  *.ts|*.tsx|*.js|*.jsx)
    ;;
  *)
    exit 0
    ;;
esac

# Skip node_modules and build artifacts
case "$FILE_PATH" in
  */node_modules/*|*/build/*|*/.cache/*)
    exit 0
    ;;
esac

ERRORS=""

# Run ESLint on the modified file
LINT_OUTPUT=$(npx eslint --no-eslintrc -c .eslintrc.cjs --quiet "$FILE_PATH" 2>/dev/null) || true
if [ -n "$LINT_OUTPUT" ]; then
  ERRORS="${ERRORS}
[LINT VIOLATIONS] in ${FILE_PATH}:
${LINT_OUTPUT}
"
fi

# Run TypeScript type checking (fast, project-wide but reports errors)
TSC_OUTPUT=$(npx tsc --noEmit --pretty false 2>&1 | grep -i "error" | head -20) || true
if [ -n "$TSC_OUTPUT" ]; then
  ERRORS="${ERRORS}
[TYPE ERRORS] detected:
${TSC_OUTPUT}
"
fi

if [ -n "$ERRORS" ]; then
  echo "CRITICAL REVIEW FINDINGS - Fix these before proceeding:"
  echo "$ERRORS"
  echo ""
  echo "The code reviewer subagent has flagged issues. Address them immediately."
  exit 1
fi

exit 0
