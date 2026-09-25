import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import AdminRoute from '../../src/components/AdminRoute';

jest.mock('react-redux', () => ({ useSelector: jest.fn() }));

const AdminPage = () => <h1>Admin page</h1>;

test('redirects non-admin users to login', () => {
  useSelector.mockReturnValue({ userInfo: { isAdmin: false }, loading: false });

  render(
    <MemoryRouter initialEntries={['/admin']}>
      <AdminRoute path="/admin" component={AdminPage} />
      <Route path="/login" render={() => <p>Login route</p>} />
    </MemoryRouter>,
  );

  expect(screen.getByText('Login route')).toBeInTheDocument();
});

test('renders the protected page for administrators', () => {
  useSelector.mockReturnValue({ userInfo: { isAdmin: true }, loading: false });

  render(
    <MemoryRouter initialEntries={['/admin']}>
      <AdminRoute path="/admin" component={AdminPage} />
    </MemoryRouter>,
  );

  expect(screen.getByRole('heading', { name: 'Admin page' })).toBeInTheDocument();
});
