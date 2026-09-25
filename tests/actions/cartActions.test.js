import api from '../../src/api/client';
import { addToCart, savePaymentMethod, saveShippingAddress } from '../../src/actions/cartActions';
import {
  CART_ADD_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../../src/constants/cartConstants';

jest.mock('../../src/api/client', () => ({
  __esModule: true,
  default: { get: jest.fn() },
}));

test('adds a fetched product to the cart and persists it', async () => {
  api.get.mockResolvedValue({
    data: {
      _id: '1', name: 'Phone', image: '/phone.jpg', price: 10, countInStock: 3,
    },
  });
  const dispatch = jest.fn();
  const getState = jest.fn(() => ({ cart: { cartItems: [{ product: '1', qty: 2 }] } }));

  await addToCart('1', 2)(dispatch, getState);

  expect(api.get).toHaveBeenCalledWith('/api/products/1');
  expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: CART_ADD_ITEM }));
  expect(JSON.parse(localStorage.getItem('cartItems'))).toEqual([{ product: '1', qty: 2 }]);
});

test('persists shipping and payment choices', () => {
  const dispatch = jest.fn();

  saveShippingAddress({ city: 'Austin' })(dispatch);
  savePaymentMethod('PayPal')(dispatch);

  expect(dispatch).toHaveBeenCalledWith({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: { city: 'Austin' },
  });
  expect(dispatch).toHaveBeenCalledWith({ type: CART_SAVE_PAYMENT_METHOD, payload: 'PayPal' });
});
