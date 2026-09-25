import { cartReducer } from '../../src/reducers/cartReducers';
import {
  CART_ADD_ITEM,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../../src/constants/cartConstants';

test('adds and replaces cart items', () => {
  const firstItem = { product: '1', name: 'Phone', qty: 1 };
  const updatedItem = { product: '1', name: 'Phone', qty: 2 };
  const state = cartReducer(undefined, { type: CART_ADD_ITEM, payload: firstItem });

  expect(cartReducer(state, { type: CART_ADD_ITEM, payload: updatedItem }).cartItems)
    .toEqual([updatedItem]);
});

test('removes and clears cart items', () => {
  const state = { cartItems: [{ product: '1' }, { product: '2' }] };
  const removedState = cartReducer(state, { type: CART_REMOVE_ITEM, payload: '1' });

  expect(removedState.cartItems).toEqual([{ product: '2' }]);
  expect(cartReducer(removedState, { type: CART_CLEAR_ITEMS }).cartItems).toEqual([]);
});

test('stores shipping and payment details', () => {
  const state = cartReducer(undefined, {
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: { address: '1 Main Street' },
  });
  const updatedState = cartReducer(state, {
    type: CART_SAVE_PAYMENT_METHOD,
    payload: 'PayPal',
  });

  expect(updatedState.shippingAddress).toEqual({ address: '1 Main Street' });
  expect(updatedState.paymentMethod).toBe('PayPal');
});
