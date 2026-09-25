import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCarousel from '../../src/components/ProductCarousel';
import { listTopProducts } from '../../src/actions/productActions';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../src/actions/productActions', () => ({ listTopProducts: jest.fn() }));

test('dispatches the top-products request and renders carousel data', () => {
  const dispatch = jest.fn();
  useDispatch.mockReturnValue(dispatch);
  useSelector.mockReturnValue({
    loading: false,
    error: null,
    products: [{
      _id: '1', name: 'Phone', image: '/phone.jpg', price: 99,
    }],
  });
  listTopProducts.mockReturnValue({
    type: 'PRODUCT_TOP_REQUEST',
  });

  render(<MemoryRouter><ProductCarousel /></MemoryRouter>);

  expect(listTopProducts).toHaveBeenCalled();
  expect(dispatch).toHaveBeenCalledWith({ type: 'PRODUCT_TOP_REQUEST' });
  expect(screen.getByText(/Phone/)).toBeInTheDocument();
});

test('renders rejected product requests as a visible message', () => {
  useDispatch.mockReturnValue(jest.fn());
  useSelector.mockReturnValue({
    loading: false, error: 'Unable to load', products: [],
  });

  render(<MemoryRouter><ProductCarousel /></MemoryRouter>);

  expect(screen.getByText('Unable to load')).toBeInTheDocument();
});
