import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import PrivateRoute from '../../src/components/PrivateRoute';

jest.mock('react-redux', () => ({ useSelector: jest.fn() }));

const PrivatePage = () => <h1>Private page</h1>;

test('redirects unauthenticated users with the original path', () => {
  useSelector.mockReturnValue({ userInfo: null, loading: false });

  render(
    <MemoryRouter initialEntries={['/private']}>
      <PrivateRoute path="/private" component={PrivatePage} />
      <Route path="/login" render={({ location }) => <p>{location.search}</p>} />
    </MemoryRouter>,
  );

  expect(screen.getByText('?redirect=/private')).toBeInTheDocument();
});

test('renders the protected page for authenticated users', () => {
  useSelector.mockReturnValue({ userInfo: { id: 'user-1' }, loading: false });

  render(
    <MemoryRouter initialEntries={['/private']}>
      <PrivateRoute path="/private" component={PrivatePage} />
    </MemoryRouter>,
  );

  expect(screen.getByRole('heading', { name: 'Private page' })).toBeInTheDocument();
});
