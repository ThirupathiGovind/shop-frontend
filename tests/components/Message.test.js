import React from 'react';
import { render, screen } from '@testing-library/react';
import Message from '../../src/components/Message';

test('renders the supplied message with its visual variant', () => {
  render(<Message variant="danger">Unable to load products</Message>);

  expect(screen.getByText('Unable to load products')).toBeInTheDocument();
  expect(screen.getByRole('alert')).toHaveClass('alert-danger');
});
