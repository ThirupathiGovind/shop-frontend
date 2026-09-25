import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from '../../src/reducers/userReducers';
import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
} from '../../src/constants/userConstants';

test('handles login and registration lifecycle', () => {
  expect(userLoginReducer({}, { type: USER_LOGIN_REQUEST })).toEqual({ loading: true });
  expect(userLoginReducer({}, { type: USER_LOGIN_SUCCESS, payload: { id: '1' } }))
    .toEqual({ loading: false, userInfo: { id: '1' } });
  expect(userLoginReducer({}, { type: USER_LOGIN_FAIL, payload: 'failed' }))
    .toEqual({ loading: false, error: 'failed' });
  expect(userLoginReducer({}, { type: USER_LOGOUT })).toEqual({});
  expect(userRegisterReducer({}, { type: USER_REGISTER_REQUEST })).toEqual({ loading: true });
  expect(userRegisterReducer({}, { type: USER_REGISTER_SUCCESS, payload: { id: '1' } }))
    .toEqual({ loading: false, userInfo: { id: '1' } });
  expect(userRegisterReducer({}, { type: USER_REGISTER_FAIL, payload: 'failed' }))
    .toEqual({ loading: false, error: 'failed' });
  expect(userRegisterReducer({}, { type: USER_LOGOUT })).toEqual({});
});

test('handles user details and profile updates', () => {
  expect(userDetailsReducer({}, { type: USER_DETAILS_REQUEST })).toEqual({ loading: true });
  expect(userDetailsReducer({}, { type: USER_DETAILS_SUCCESS, payload: { id: '1' } }))
    .toEqual({ loading: false, user: { id: '1' } });
  expect(userDetailsReducer({}, { type: USER_DETAILS_FAIL, payload: 'failed' }))
    .toEqual({ loading: false, error: 'failed' });
  expect(userDetailsReducer({}, { type: USER_DETAILS_RESET })).toEqual({ user: {} });
  expect(userUpdateProfileReducer({}, { type: USER_UPDATE_PROFILE_REQUEST }))
    .toEqual({ loading: true });
  expect(userUpdateProfileReducer({}, {
    type: USER_UPDATE_PROFILE_SUCCESS,
    payload: { id: '1' },
  })).toEqual({ loading: false, success: true, userInfo: { id: '1' } });
  expect(userUpdateProfileReducer({}, { type: USER_UPDATE_PROFILE_FAIL, payload: 'failed' }))
    .toEqual({ loading: false, error: 'failed' });
  expect(userUpdateProfileReducer({}, { type: USER_UPDATE_PROFILE_RESET })).toEqual({});
});

test('handles user list, delete, and update lifecycle', () => {
  expect(userListReducer({}, { type: USER_LIST_REQUEST })).toEqual({ loading: true });
  expect(userListReducer({}, { type: USER_LIST_SUCCESS, payload: [] }))
    .toEqual({ loading: false, users: [] });
  expect(userListReducer({}, { type: USER_LIST_FAIL, payload: 'failed' }))
    .toEqual({ loading: false, error: 'failed' });
  expect(userListReducer({}, { type: USER_LIST_RESET })).toEqual({ users: [] });
  expect(userDeleteReducer({}, { type: USER_DELETE_REQUEST })).toEqual({ loading: true });
  expect(userDeleteReducer({}, { type: USER_DELETE_SUCCESS }))
    .toEqual({ loading: false, success: true });
  expect(userDeleteReducer({}, { type: USER_DELETE_FAIL, payload: 'failed' }))
    .toEqual({ loading: false, error: 'failed' });
  expect(userUpdateReducer({}, { type: USER_UPDATE_REQUEST })).toEqual({ loading: true });
  expect(userUpdateReducer({}, { type: USER_UPDATE_SUCCESS }))
    .toEqual({ loading: false, success: true });
  expect(userUpdateReducer({}, { type: USER_UPDATE_FAIL, payload: 'failed' }))
    .toEqual({ loading: false, error: 'failed' });
  expect(userUpdateReducer({}, { type: USER_UPDATE_RESET })).toEqual({ user: {} });
});
