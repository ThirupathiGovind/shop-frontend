import React from 'react';
import { render, wait } from '@testing-library/react';
import Meta from '../../src/components/Meta';

test('updates document metadata from supplied props', async () => {
  render(<Meta title="Products" description="Browse products" keywords="shop" />);

  await wait(() => {
    expect(document.title).toBe('Products');
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      'Browse products',
    );
  });
});
