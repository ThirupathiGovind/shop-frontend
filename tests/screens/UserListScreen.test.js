import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import UserListScreen from '../../src/screens/UserListScreen';
import { listUsers } from '../../src/actions/userActions';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('../../src/actions/userActions', () => ({
  listUsers: jest.fn(),
  deleteUser: jest.fn(),
}));

test('renders the authenticated admin user list', () => {
  useDispatch.mockReturnValue(jest.fn());
  useSelector.mockReturnValue({
    loading: false, error: null, users: [], userInfo: { isAdmin: true }, successDelete: false,
  });
  render(
    <MemoryRouter>
      <UserListScreen history={{ push: jest.fn() }} />
    </MemoryRouter>,
  );

  expect(screen.getByRole('heading', { name: 'Users' })).toBeInTheDocument();
  expect(listUsers).toHaveBeenCalled();
});
