import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import PaymentScreen from '../../src/screens/PaymentScreen';
import { savePaymentMethod } from '../../src/actions/cartActions';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../src/actions/cartActions', () => ({
  savePaymentMethod: jest.fn(),
}));

test('saves the selected payment method and continues to place order', () => {
  const dispatch = jest.fn();
  const history = { push: jest.fn() };
  useDispatch.mockReturnValue(dispatch);
  useSelector.mockReturnValue({ shippingAddress: { address: '1 Main Street' } });

  render(
    <MemoryRouter>
      <PaymentScreen history={history} />
    </MemoryRouter>,
  );

  fireEvent.click(screen.getByRole('button', { name: 'Continue' }));

  expect(savePaymentMethod).toHaveBeenCalledWith('PayPal');
  expect(history.push).toHaveBeenCalledWith('/placeorder');
});
