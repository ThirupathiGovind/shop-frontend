import store from '../src/store';
import { USER_LOGIN_SUCCESS } from '../src/constants/userConstants';

test('initializes cart and unauthenticated user state', () => {
  const state = store.getState();

  expect(state.cart.cartItems).toEqual([]);
  expect(state.userLogin.userInfo).toBeNull();
});

test('updates authenticated user state through the store', () => {
  const user = { id: 'user-1', name: 'Test User' };

  store.dispatch({ type: USER_LOGIN_SUCCESS, payload: user });

  expect(store.getState().userLogin).toEqual({ loading: false, userInfo: user });
});
