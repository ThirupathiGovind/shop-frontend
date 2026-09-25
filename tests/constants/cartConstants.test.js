import * as constants from '../../src/constants/cartConstants';

test('exports stable cart action types', () => {
  expect(constants.CART_ADD_ITEM).toBe('CART_ADD_ITEM');
  expect(constants.CART_CLEAR_ITEMS).toBe('CART_RESET');
  expect(constants.CART_REMOVE_ITEM).toBe('CART_REMOVE_ITEM');
});
