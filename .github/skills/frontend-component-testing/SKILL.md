---
name: frontend-component-testing
description: 'Use when adding or reviewing React component, screen, Redux, router, storage, Axios, or async UI tests in shop-frontend.'
user-invocable: true
---

# Frontend Component Testing

## Test Layout

Keep the test tree aligned with `src` without changing the production source
layout. Every source JavaScript file has a corresponding test file under the
same relative path in `tests`; for example, `src/components/Message.js` is
tested by `tests/components/Message.test.js`. Keep root source files at the
test root and use `tests/screens` for `src/screens`.

Do not create unrelated top-level test categories such as `pages`, `features`,
`hooks`, or `utils` when those directories do not exist under `src`. Put tests
next to the matching source area instead.

## Procedure

1. Read the component or screen and its actions, reducers, route dependencies, and nearby test.
2. Test user-visible behavior with React Testing Library rather than implementation details.
3. Mock Axios and external payment SDKs at the API boundary.
4. Provide realistic Redux, router, storage, and authenticated-user fixtures.
5. Cover loading, success, empty, rejected, unauthorized, and role-restricted states.
6. For forms, test labels, validation, submission, and visible errors.
7. Run `npm run test:ci -- --runInBand <test-file>`.
8. Finish with `npm run lint`, `npm run test:coverage`, and `npm run build`.

## Commands

Run from `shop-frontend`:

- `npm run lint`
- `npm run test:ci`
- `npm run test:coverage`
- `npm run build`
- `npm run quality`

Avoid brittle snapshots and assertions against private component state.
