import React from 'react';
import { render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import OrderListScreen from '../../src/screens/OrderListScreen';
import { listOrders } from '../../src/actions/orderActions';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('../../src/actions/orderActions', () => ({ listOrders: jest.fn() }));

test('renders an empty authenticated admin order list', () => {
  useDispatch.mockReturnValue(jest.fn());
  useSelector.mockReturnValue({
    loading: false, error: null, orders: [], userInfo: { isAdmin: true },
  });
  render(<OrderListScreen history={{ push: jest.fn() }} />);

  expect(screen.getByRole('heading', { name: 'Orders' })).toBeInTheDocument();
  expect(listOrders).toHaveBeenCalled();
});
