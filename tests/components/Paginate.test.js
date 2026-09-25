import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Paginate from '../../src/components/Paginate';

test('creates regular and keyword page links', () => {
  const { rerender } = render(
    <MemoryRouter><Paginate pages={2} page={1} /></MemoryRouter>,
  );

  expect(screen.getByRole('link', { name: '2' })).toHaveAttribute('href', '/page/2');
  rerender(
    <MemoryRouter><Paginate pages={2} page={2} keyword="phone" /></MemoryRouter>,
  );
  expect(screen.getByText('2', { selector: 'span' })).toHaveAttribute(
    'href',
    '/search/phone/page/2',
  );
});
