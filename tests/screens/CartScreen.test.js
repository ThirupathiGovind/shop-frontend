import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import CartScreen from '../../src/screens/CartScreen';
import { addToCart, removeFromCart } from '../../src/actions/cartActions';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('../../src/actions/cartActions', () => ({
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
}));

test('renders an empty cart and disables checkout', () => {
  useDispatch.mockReturnValue(jest.fn());
  useSelector.mockReturnValue({ cartItems: [] });

  render(
    <MemoryRouter>
      <CartScreen match={{ params: {} }} location={{ search: '' }} history={{ push: jest.fn() }} />
    </MemoryRouter>,
  );

  expect(screen.getByText(/Your cart is empty/)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Proceed To Checkout/i })).toBeDisabled();
});

test('renders cart totals and supports item removal and checkout', () => {
  const dispatch = jest.fn();
  const history = { push: jest.fn() };
  useDispatch.mockReturnValue(dispatch);
  useSelector.mockReturnValue({
    cartItems: [{
      product: '1', name: 'Phone', image: '/phone.jpg', price: 10, qty: 2, countInStock: 3,
    }],
  });

  render(
    <MemoryRouter>
      <CartScreen match={{ params: {} }} location={{ search: '' }} history={history} />
    </MemoryRouter>,
  );

  expect(screen.getByText('$20.00')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: '' }));
  expect(removeFromCart).toHaveBeenCalledWith('1');
  fireEvent.click(screen.getByRole('button', { name: /Proceed To Checkout/i }));
  expect(history.push).toHaveBeenCalledWith('/login?redirect=shipping');
  expect(addToCart).not.toHaveBeenCalled();
});
