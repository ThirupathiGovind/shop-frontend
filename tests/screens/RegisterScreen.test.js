import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import RegisterScreen from '../../src/screens/RegisterScreen';
import { register } from '../../src/actions/userActions';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../src/actions/userActions', () => ({
  register: jest.fn(),
}));

const renderRegister = (state = { loading: false, error: null, userInfo: null }) => {
  useDispatch.mockReturnValue(jest.fn());
  useSelector.mockReturnValue(state);
  return render(
    <MemoryRouter>
      <RegisterScreen location={{ search: '' }} history={{ push: jest.fn() }} />
    </MemoryRouter>,
  );
};

test('validates short and mismatched passwords', () => {
  renderRegister();

  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'short' } });
  fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'short' } });
  fireEvent.click(screen.getByRole('button', { name: 'Register' }));
  expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password-1' } });
  fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'password-2' } });
  fireEvent.click(screen.getByRole('button', { name: 'Register' }));
  expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
});

test('submits valid registration details and displays API errors', () => {
  renderRegister({ loading: false, error: 'Email already exists', userInfo: null });

  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Alice' } });
  fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '555-0100' } });
  fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'a@example.com' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password-1' } });
  fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'password-1' } });
  fireEvent.click(screen.getByRole('button', { name: 'Register' }));

  expect(register).toHaveBeenCalledWith('Alice', '555-0100', 'a@example.com', 'password-1');
  expect(screen.getByText('Email already exists')).toBeInTheDocument();
});
