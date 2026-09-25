import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../../src/components/ErrorBoundary';

const BrokenChild = () => {
  throw new Error('render failed');
};

test('shows an error message when a child component fails', () => {
  const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

  render(<ErrorBoundary><BrokenChild /></ErrorBoundary>);

  expect(screen.getByText(/This page could not be loaded/)).toBeInTheDocument();
  consoleError.mockRestore();
});
