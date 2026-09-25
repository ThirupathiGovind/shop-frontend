import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import PlaceOrderScreen from '../../src/screens/PlaceOrderScreen';
import { createOrder } from '../../src/actions/orderActions';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('../../src/actions/orderActions', () => ({ createOrder: jest.fn() }));

test('renders order totals and submits a non-empty order', () => {
  const dispatch = jest.fn();
  const history = { push: jest.fn() };
  useDispatch.mockReturnValue(dispatch);
  useSelector
    .mockReturnValueOnce({
      cartItems: [{
        product: '1', name: 'Phone', image: '/phone.jpg', price: 10, qty: 2,
      }],
      shippingAddress: {
        address: '1 Main', city: 'Austin', postalCode: '78701', country: 'USA',
      },
      paymentMethod: 'PayPal',
    })
    .mockReturnValueOnce({
      order: null, success: false, error: null, loading: false,
    });

  render(
    <MemoryRouter>
      <PlaceOrderScreen history={history} />
    </MemoryRouter>,
  );

  expect(screen.getByText('Order Summary')).toBeInTheDocument();
  expect(screen.getByText('$123.00')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Place Order' }));
  expect(createOrder).toHaveBeenCalledWith(expect.objectContaining({
    paymentMethod: 'PayPal',
    totalPrice: '123.00',
  }));
});
