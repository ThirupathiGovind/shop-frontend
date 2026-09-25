import axios from 'axios';
import {
  createRequestController,
  getApiError,
} from '../../src/api/client';

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    create: jest.fn(() => ({
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() },
      },
    })),
  },
}));

test('configures the backend URL and preserves credential support', () => {
  expect(axios.create).toHaveBeenCalledWith(expect.objectContaining({
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: true,
    timeout: 15000,
  }));
});

test('returns clear messages for network and API errors', () => {
  expect(getApiError({ code: 'ECONNABORTED' })).toMatch(/Unable to reach/);
  expect(getApiError({ response: null })).toMatch(/Unable to reach/);
  expect(getApiError({ response: { data: { message: 'Invalid request' } } }))
    .toBe('Invalid request');
  expect(getApiError({ response: { data: {} } })).toMatch(/Something went wrong/);
});

test('creates an abort controller for cancellable requests', () => {
  const controller = createRequestController();

  expect(controller).toBeInstanceOf(AbortController);
  expect(controller.signal.aborted).toBe(false);
  controller.abort();
  expect(controller.signal.aborted).toBe(true);
});
