# Pre-Commit Validation

Run all checks that must pass before creating a commit. This is a streamlined version of the quality gate focused on speed.

## Steps

1. Run `npm run typecheck` - fail fast on type errors
2. Run `npm run lint` - check for lint violations
3. Run `git diff --cached --name-only` to see what's staged
4. For each staged file, verify:
   - No `console.log` statements (unless in development utilities)
   - No `TODO` or `FIXME` comments without associated issue numbers
   - No hardcoded secrets, API keys, or credentials
   - No `debugger` statements
   - No commented-out code blocks (>3 lines)
5. If MDX files are staged, verify frontmatter is complete (title, date, image, tags)
6. Report pass/fail with specific issues to fix

## On Failure
List exactly what needs to be fixed before the commit can proceed. Be specific with file paths and line numbers.
