import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import ShippingScreen from '../../src/screens/ShippingScreen';
import { saveShippingAddress } from '../../src/actions/cartActions';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../src/actions/cartActions', () => ({
  saveShippingAddress: jest.fn(),
}));

test('saves a complete shipping address and continues to payment', () => {
  const dispatch = jest.fn();
  const history = { push: jest.fn() };
  useDispatch.mockReturnValue(dispatch);
  useSelector.mockReturnValue({ shippingAddress: {} });

  render(
    <MemoryRouter>
      <ShippingScreen history={history} />
    </MemoryRouter>,
  );

  fireEvent.change(screen.getByLabelText('Address'), { target: { value: '1 Main Street' } });
  fireEvent.change(screen.getByLabelText('City'), { target: { value: 'Austin' } });
  fireEvent.change(screen.getByLabelText('Postal Code'), { target: { value: '78701' } });
  fireEvent.change(screen.getByLabelText('Country'), { target: { value: 'USA' } });
  fireEvent.click(screen.getByRole('button', { name: 'Continue' }));

  expect(saveShippingAddress).toHaveBeenCalledWith({
    address: '1 Main Street', city: 'Austin', postalCode: '78701', country: 'USA',
  });
  expect(history.push).toHaveBeenCalledWith('/payment');
});
