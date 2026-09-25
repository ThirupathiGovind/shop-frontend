import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import ProductEditScreen from '../../src/screens/ProductEditScreen';
import { listProductDetails } from '../../src/actions/productActions';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('../../src/actions/productActions', () => ({
  listProductDetails: jest.fn(),
  updateProduct: jest.fn(),
}));

test('loads an existing product into the edit form', () => {
  useDispatch.mockReturnValue(jest.fn());
  useSelector.mockReturnValue({
    loading: false,
    error: null,
    product: {
      _id: 'product-1',
      name: 'Phone',
      price: 10,
      image: '/phone.jpg',
      brand: 'Brand',
      category: 'Electronics',
      countInStock: 2,
      description: 'A phone',
    },
    loadingUpdate: false,
    errorUpdate: null,
    successUpdate: false,
  });

  render(
    <MemoryRouter>
      <ProductEditScreen match={{ params: { id: 'product-1' } }} history={{ push: jest.fn() }} />
    </MemoryRouter>,
  );

  expect(screen.getByRole('heading', { name: 'Edit Product' })).toBeInTheDocument();
  expect(screen.getByLabelText('Name')).toHaveValue('Phone');
  expect(listProductDetails).not.toHaveBeenCalled();
});
