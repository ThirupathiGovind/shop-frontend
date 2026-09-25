import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import ProductScreen from '../../src/screens/ProductScreen';
import { createProductReview, listProductDetails } from '../../src/actions/productActions';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('../../src/actions/productActions', () => ({
  createProductReview: jest.fn(),
  listProductDetails: jest.fn(),
}));

test('renders product details and adds an in-stock item to the cart', () => {
  const dispatch = jest.fn();
  const history = { push: jest.fn() };
  const product = {
    _id: '1',
    name: 'Phone',
    image: '/phone.jpg',
    rating: 4,
    numReviews: 1,
    price: 10,
    countInStock: 2,
    description: 'A phone',
    reviews: [],
  };
  useDispatch.mockReturnValue(dispatch);
  useSelector
    .mockReturnValueOnce({ loading: false, error: null, product })
    .mockReturnValueOnce({ userInfo: null })
    .mockReturnValueOnce({ success: false, loading: false, error: null });

  render(
    <MemoryRouter>
      <ProductScreen history={history} match={{ params: { id: '1' } }} />
    </MemoryRouter>,
  );

  expect(screen.getByText('Phone')).toBeInTheDocument();
  expect(screen.getByText('In Stock')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Add To Cart' }));
  expect(history.push).toHaveBeenCalledWith('/cart/1?qty=1');
  expect(screen.getByText(/Please/)).toBeInTheDocument();
  expect(listProductDetails).not.toHaveBeenCalled();
  expect(createProductReview).not.toHaveBeenCalled();
});
