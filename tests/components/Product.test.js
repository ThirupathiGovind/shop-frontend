import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Product from '../../src/components/Product';

const product = {
  _id: 'product-1', image: '/phone.jpg', name: 'Phone', rating: 4.5, numReviews: 12, price: 99,
};

test('renders product details and product links', () => {
  render(<MemoryRouter><Product product={product} /></MemoryRouter>);

  expect(screen.getByText('Phone')).toBeInTheDocument();
  expect(screen.getByText('$99')).toBeInTheDocument();
  expect(screen.getByText('12 reviews')).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /Phone/i })[0])
    .toHaveAttribute('href', '/product/product-1');
});
