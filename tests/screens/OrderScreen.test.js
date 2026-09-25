import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import OrderScreen from '../../src/screens/OrderScreen';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('../../src/actions/orderActions', () => ({
  getOrderDetails: jest.fn(),
  payOrder: jest.fn(),
  deliverOrder: jest.fn(),
}));
jest.mock('@paypal/react-paypal-js', () => ({
  PayPalScriptProvider: ({ children }) => <div>{children}</div>,
  PayPalButtons: () => <button type="button">PayPal</button>,
}));

test('renders a paid and delivered order summary', () => {
  useDispatch.mockReturnValue(jest.fn());
  useSelector
    .mockReturnValueOnce({
      loading: false,
      error: null,
      order: {
        _id: 'order-1',
        user: { name: 'Alice', email: 'a@example.com' },
        shippingAddress: {
          address: '1 Main', city: 'Austin', postalCode: '78701', country: 'USA',
        },
        paymentMethod: 'PayPal',
        isPaid: true,
        paidAt: '2026-01-01',
        isDelivered: true,
        deliveredAt: '2026-01-02',
        orderItems: [],
        shippingPrice: 0,
        taxPrice: 1,
        totalPrice: 11,
      },
    })
    .mockReturnValueOnce({ loading: false, success: false, error: null })
    .mockReturnValueOnce({ loading: false, success: false })
    .mockReturnValueOnce({ userInfo: { isAdmin: false } });

  render(
    <MemoryRouter>
      <OrderScreen match={{ params: { id: 'order-1' } }} history={{ push: jest.fn() }} />
    </MemoryRouter>,
  );

  expect(screen.getByRole('heading', { name: /Order\s*order-1/ })).toBeInTheDocument();
  expect(screen.getByText(/Delivered on/)).toBeInTheDocument();
  expect(screen.getByText(/Paid on/)).toBeInTheDocument();
  expect(screen.getByText('Order is empty')).toBeInTheDocument();
});
