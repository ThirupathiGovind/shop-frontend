import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import HomeScreen from '../../src/screens/HomeScreen';
import { listProducts } from '../../src/actions/productActions';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('../../src/actions/productActions', () => ({ listProducts: jest.fn() }));
jest.mock('../../src/components/ProductCarousel', () => () => <div>Carousel</div>);

const renderHome = (state) => {
  useDispatch.mockReturnValue(jest.fn());
  useSelector.mockReturnValue(state);
  return render(
    <MemoryRouter>
      <HomeScreen match={{ params: { keyword: 'phone', pageNumber: '1' } }} />
    </MemoryRouter>,
  );
};

test('loads and renders an empty product search result', () => {
  renderHome({
    loading: false, error: null, products: [], page: 1, pages: 1,
  });

  expect(screen.getByRole('heading', { name: 'Latest Products' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Go Back' })).toHaveAttribute('href', '/');
  expect(listProducts).toHaveBeenCalledWith('phone', '1');
});

test('shows loading and API error states', () => {
  renderHome({
    loading: true, error: null, products: [], page: 1, pages: 1,
  });
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  renderHome({
    loading: false, error: 'Unable to load products', products: [], page: 1, pages: 1,
  });
  expect(screen.getByText('Unable to load products')).toBeInTheDocument();
});
