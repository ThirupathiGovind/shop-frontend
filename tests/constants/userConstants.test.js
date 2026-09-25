import * as constants from '../../src/constants/userConstants';

test('exports stable user lifecycle types', () => {
  expect(constants.USER_LOGIN_REQUEST).toBe('USER_LOGIN_REQUEST');
  expect(constants.USER_LOGOUT).toBe('USER_LOGOUT');
  expect(constants.USER_UPDATE_RESET).toBe('USER_UPDATE_RESET');
});
