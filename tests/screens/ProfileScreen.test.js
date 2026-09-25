import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileScreen from '../../src/screens/ProfileScreen';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('../../src/actions/userActions', () => ({
  getUserDetails: jest.fn(),
  updateUserProfile: jest.fn(),
}));
jest.mock('../../src/actions/orderActions', () => ({ listMyOrders: jest.fn() }));

test('renders an authenticated profile and empty order list', () => {
  useDispatch.mockReturnValue(jest.fn());
  useSelector.mockReturnValue({
    loading: false,
    error: null,
    user: {
      _id: 'user-1', name: 'Alice', phoneNumber: '555', email: 'a@example.com',
    },
    userInfo: { id: 'user-1' },
    success: false,
    loadingOrders: false,
    errorOrders: null,
    orders: [],
  });

  render(
    <MemoryRouter>
      <ProfileScreen history={{ push: jest.fn() }} />
    </MemoryRouter>,
  );

  expect(screen.getByRole('heading', { name: 'User Profile' })).toBeInTheDocument();
  expect(screen.getByLabelText('Name')).toHaveValue('Alice');
  expect(screen.getByRole('heading', { name: 'My Orders' })).toBeInTheDocument();
});
