import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SearchBox from '../../src/components/SearchBox';

test('navigates to a search result or home for an empty query', () => {
  const history = { push: jest.fn() };
  render(<SearchBox history={history} />);
  const input = screen.getByPlaceholderText('Search Products...');

  fireEvent.change(input, { target: { value: 'phone' } });
  fireEvent.click(screen.getByRole('button', { name: 'Search' }));
  expect(history.push).toHaveBeenLastCalledWith('/search/phone');

  fireEvent.change(input, { target: { value: '   ' } });
  fireEvent.click(screen.getByRole('button', { name: 'Search' }));
  expect(history.push).toHaveBeenLastCalledWith('/');
});
