import { register, unregister } from '../src/serviceWorker';

test('exposes service worker lifecycle functions', () => {
  expect(register).toEqual(expect.any(Function));
  expect(unregister).toEqual(expect.any(Function));
  expect(() => register()).not.toThrow();
  expect(() => unregister()).not.toThrow();
});
