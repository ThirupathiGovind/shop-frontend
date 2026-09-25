import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import ProductListScreen from '../../src/screens/ProductListScreen';
import { listProducts } from '../../src/actions/productActions';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('../../src/actions/productActions', () => ({
  listProducts: jest.fn(),
  deleteProduct: jest.fn(),
  createProduct: jest.fn(),
}));

test('renders the authenticated empty product list', () => {
  useDispatch.mockReturnValue(jest.fn());
  useSelector.mockReturnValue({
    loading: false,
    error: null,
    products: [],
    page: 1,
    pages: 1,
    userInfo: { isAdmin: true },
    success: false,
  });

  render(
    <MemoryRouter>
      <ProductListScreen history={{ push: jest.fn() }} match={{ params: {} }} />
    </MemoryRouter>,
  );

  expect(screen.getByRole('heading', { name: 'Products' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Create Product/i })).toBeInTheDocument();
  expect(listProducts).toHaveBeenCalledWith('', 1);
});
