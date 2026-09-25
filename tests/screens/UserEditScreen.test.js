import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import UserEditScreen from '../../src/screens/UserEditScreen';
import { getUserDetails } from '../../src/actions/userActions';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('../../src/actions/userActions', () => ({
  getUserDetails: jest.fn(),
  updateUser: jest.fn(),
}));

test('loads an existing user into the edit form', () => {
  useDispatch.mockReturnValue(jest.fn());
  useSelector.mockReturnValue({
    loading: false,
    error: null,
    user: {
      _id: 'user-1', name: 'Alice', email: 'a@example.com', isAdmin: true,
    },
    successUpdate: false,
    loadingUpdate: false,
    errorUpdate: null,
  });

  render(
    <MemoryRouter>
      <UserEditScreen match={{ params: { id: 'user-1' } }} history={{ push: jest.fn() }} />
    </MemoryRouter>,
  );

  expect(screen.getByRole('heading', { name: 'Edit User' })).toBeInTheDocument();
  expect(screen.getByLabelText('Name')).toHaveValue('Alice');
  expect(screen.getByLabelText('Is Admin')).toBeChecked();
  expect(getUserDetails).not.toHaveBeenCalled();
});
