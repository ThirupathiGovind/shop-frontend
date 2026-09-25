import React from 'react';
import { render, screen } from '@testing-library/react';
import FormContainer from '../../src/components/FormContainer';

test('renders children inside the form container', () => {
  render(<FormContainer><h1>Account form</h1></FormContainer>);

  expect(screen.getByRole('heading', { name: 'Account form' })).toBeInTheDocument();
});
