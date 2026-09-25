# Frontend Instructions

- Run `npm run lint`, `npm run test:ci`, `npm run test:coverage`, and `npm run build` before completing frontend changes.
- Test authored runtime JavaScript under `src`; exclude generated builds, static assets, and the service worker bootstrap.
- Test user-visible behavior with React Testing Library and keep network calls mocked at the API boundary.
- Never commit secrets, bearer tokens, or payment credentials.
- Preserve existing API response contracts unless an API migration is explicitly requested.
