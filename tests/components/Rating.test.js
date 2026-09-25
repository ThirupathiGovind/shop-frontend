import React from 'react';
import { render, screen } from '@testing-library/react';
import Rating from '../../src/components/Rating';

test('renders full, half, and empty rating icons', () => {
  const { container } = render(<Rating value={4.5} text="12 reviews" />);

  expect(container.querySelectorAll('.fa-star')).toHaveLength(4);
  expect(container.querySelectorAll('.fa-star-half-alt')).toHaveLength(1);
  expect(screen.getByText('12 reviews')).toBeInTheDocument();
});
