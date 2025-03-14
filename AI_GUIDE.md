# AI Development Guide for Linear Activity Graph

## Project Workflow

### 1. Before Starting Any Task

1. Read and understand the `PRODUCT_SPEC.md` file
2. Check if the spec needs updates for the current task
3. Update the spec if new requirements or changes are identified
4. Document any spec changes in the commit message

### 2. Development Process

1. Make changes to the codebase
2. Run `yarn build` after each significant change
3. If build fails:
   - Analyze the error message
   - Fix TypeScript/linting issues
   - Address any dependency problems
   - Run `yarn build` again until successful
4. Test the changes locally with `yarn dev`

### 3. Code Organization

- Keep components in the `app` directory
- Use TypeScript for all new files
- Follow existing patterns for:
  - Authentication
  - Data fetching
  - State management
  - UI components

### 4. Error Handling

- Always include error states in UI
- Log errors to console for debugging
- Provide user-friendly error messages
- Handle edge cases (no data, network errors)

### 5. Testing Checklist

After each change, verify:

- [ ] Build succeeds (`yarn build`)
- [ ] Development server runs (`yarn dev`)
- [ ] Authentication works
- [ ] Data fetching functions
- [ ] Visualization renders correctly
- [ ] UI is responsive
- [ ] Error states work as expected

### 6. Documentation

- Update relevant documentation
- Add comments for complex logic
- Document any new environment variables
- Update the product spec if needed

### 7. Common Issues and Solutions

#### Build Failures

1. TypeScript errors:

   - Check type definitions
   - Add missing interfaces
   - Fix type assertions

2. Dependency issues:

   - Check package versions
   - Run `yarn install`
   - Clear node_modules if needed

3. Next.js issues:
   - Check client/server component boundaries
   - Verify environment variables
   - Check Next.js configuration

#### Authentication Issues

1. Check environment variables:

   ```
   LINEAR_CLIENT_ID
   LINEAR_CLIENT_SECRET
   NEXTAUTH_URL
   NEXTAUTH_SECRET
   ```

2. Verify OAuth configuration:
   - Correct scopes
   - Valid redirect URIs
   - Proper token handling

#### Data Fetching Issues

1. Check Linear API:

   - Valid access token
   - Correct query structure
   - Proper error handling

2. Data processing:
   - Date formatting
   - Data aggregation
   - Type safety

### 8. Performance Considerations

- Use proper React hooks
- Implement proper loading states
- Optimize data fetching
- Consider pagination for large datasets
- Cache data when appropriate

### 9. Security Guidelines

- Never expose sensitive data
- Use environment variables
- Implement proper authentication
- Validate user input
- Follow OAuth best practices

### 10. Commit Messages

Format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:

- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Testing
- chore: Maintenance

### 11. Review Process

Before completing a task:

1. Run `yarn build`
2. Run `yarn dev`
3. Test all features
4. Check error states
5. Verify documentation
6. Update product spec if needed
7. Create meaningful commit message

### 12. Future Enhancements

When implementing new features:

1. Update `PRODUCT_SPEC.md`
2. Add new environment variables if needed
3. Update documentation
4. Consider backward compatibility
5. Add appropriate error handling
6. Test thoroughly
7. Verify build process
