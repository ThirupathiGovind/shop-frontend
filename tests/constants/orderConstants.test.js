import * as constants from '../../src/constants/orderConstants';

test('exports stable order lifecycle types', () => {
  expect(constants.ORDER_CREATE_REQUEST).toBe('ORDER_CREATE_REQUEST');
  expect(constants.ORDER_PAY_SUCCESS).toBe('ORDER_PAY_SUCCESS');
  expect(constants.ORDER_LIST_MY_RESET).toBe('ORDER_LIST_MY_RESET');
});
