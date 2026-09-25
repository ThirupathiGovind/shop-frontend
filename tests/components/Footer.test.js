import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../src/components/Footer';

test('renders the footer copyright notice', () => {
  render(<Footer />);

  expect(screen.getByText(/Copyright/)).toBeInTheDocument();
});
