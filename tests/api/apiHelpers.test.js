import { getApiError, createRequestController } from '../../src/api/client';

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    create: jest.fn(() => ({
      interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
    })),
  },
}));

test('translates common API failures into stable user messages', () => {
  expect(getApiError({ code: 'ECONNABORTED' }))
    .toBe('Unable to reach the server. Check your connection and try again.');
  expect(getApiError({ response: { data: { message: 'Not authorized' } } }))
    .toBe('Not authorized');
  expect(getApiError({ response: { data: {} } }))
    .toBe('Something went wrong. Please try again.');
});

test('creates an abort controller that can cancel a request', () => {
  const controller = createRequestController();

  expect(controller.signal.aborted).toBe(false);
  controller.abort();
  expect(controller.signal.aborted).toBe(true);
});
