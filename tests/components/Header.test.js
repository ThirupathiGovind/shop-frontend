import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../src/components/Header';
import { logout } from '../../src/actions/userActions';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../src/actions/userActions', () => ({
  logout: jest.fn(),
}));

test('shows sign in navigation for anonymous users', () => {
  useDispatch.mockReturnValue(jest.fn());
  useSelector.mockReturnValue({ userInfo: null });

  render(<MemoryRouter><Header /></MemoryRouter>);

  expect(screen.getByText('Sign In')).toBeInTheDocument();
  expect(screen.queryByText('Admin')).not.toBeInTheDocument();
});

test('shows account and admin navigation for an admin and supports logout', () => {
  const dispatch = jest.fn();
  useDispatch.mockReturnValue(dispatch);
  useSelector.mockReturnValue({ userInfo: { name: 'Alice', isAdmin: true } });
  logout.mockReturnValue({ type: 'USER_LOGOUT' });

  render(<MemoryRouter><Header /></MemoryRouter>);

  fireEvent.click(screen.getByText('Alice'));
  expect(screen.getByText('Profile')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Admin'));
  expect(screen.getByText('Users')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Logout'));

  expect(logout).toHaveBeenCalled();
  expect(dispatch).toHaveBeenCalledWith({ type: 'USER_LOGOUT' });
});
