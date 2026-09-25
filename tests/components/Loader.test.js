import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from '../../src/components/Loader';

test('exposes a loading status while data is pending', () => {
  render(<Loader />);

  expect(screen.getByRole('status')).toHaveTextContent('Loading...');
});
