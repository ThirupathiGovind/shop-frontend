import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import CheckoutSteps from '../../src/components/CheckoutSteps';

test('renders enabled checkout links and disables unavailable steps', () => {
  render(
    <MemoryRouter>
      <CheckoutSteps step1 step3={false} step4 />
    </MemoryRouter>,
  );

  expect(screen.getByRole('link', { name: 'Sign In' })).toHaveAttribute('href', '/login');
  expect(screen.getByRole('link', { name: 'Place Order' })).toHaveAttribute(
    'href',
    '/placeorder',
  );
  expect(screen.getByText('Payment')).toHaveAttribute('aria-disabled', 'true');
});
