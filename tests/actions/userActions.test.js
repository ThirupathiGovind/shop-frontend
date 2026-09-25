import api from '../../src/api/client';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from '../../src/constants/userConstants';
import {
  deleteUser,
  getUserDetails,
  login,
  listUsers,
  register,
  updateUser,
  updateUserProfile,
} from '../../src/actions/userActions';

jest.mock('../../src/api/client', () => ({
  __esModule: true,
  default: {
    get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn(),
  },
}));

describe('user authentication actions', () => {
  beforeEach(() => {
    sessionStorage.clear();
    api.get.mockReset();
    api.post.mockReset();
    api.put.mockReset();
    api.delete.mockReset();
  });

  test('logs in with the expected endpoint and credentials', async () => {
    const response = { id: 'user-1', token: 'token-1' };
    api.post.mockResolvedValue({ data: response });
    const dispatch = jest.fn();

    await login('user@example.com', 'password-123')(dispatch);

    expect(api.post).toHaveBeenCalledWith(
      '/api/users/login',
      { email: 'user@example.com', password: 'password-123' },
      { headers: { 'Content-Type': 'application/json' } },
    );
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: USER_LOGIN_REQUEST });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: USER_LOGIN_SUCCESS,
      payload: response,
    });
    expect(JSON.parse(sessionStorage.getItem('userInfo'))).toEqual(response);
  });

  test('dispatches a failure when login is rejected', async () => {
    api.post.mockRejectedValue({ response: { data: { message: 'Invalid credentials' } } });
    const dispatch = jest.fn();

    await login('user@example.com', 'wrong-password')(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, { type: USER_LOGIN_REQUEST });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: USER_LOGIN_FAIL,
      payload: 'Invalid credentials',
    });
    expect(sessionStorage.getItem('userInfo')).toBeNull();
  });

  test('runs registration and authenticated user management success flows', async () => {
    const response = { id: 'user-1', name: 'Alice', token: 'token-1' };
    const dispatch = jest.fn();
    const getState = () => ({ userLogin: { userInfo: { token: 'token-1' } } });
    api.post.mockResolvedValue({ data: response });
    api.get.mockResolvedValue({ data: response });
    api.put.mockResolvedValue({ data: response });
    api.delete.mockResolvedValue({});

    await register('Alice', '555-0100', 'a@example.com', 'password-1')(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ type: USER_REGISTER_REQUEST });
    expect(dispatch).toHaveBeenCalledWith({ type: USER_REGISTER_SUCCESS, payload: response });

    dispatch.mockClear();
    await getUserDetails('profile')(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith({ type: USER_DETAILS_REQUEST });
    expect(dispatch).toHaveBeenCalledWith({ type: USER_DETAILS_SUCCESS, payload: response });

    dispatch.mockClear();
    await updateUserProfile({ name: 'Alice' })(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith({ type: USER_UPDATE_PROFILE_REQUEST });
    expect(dispatch).toHaveBeenCalledWith({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: response,
    });

    dispatch.mockClear();
    api.get.mockResolvedValue({ data: [response] });
    await listUsers()(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith({ type: USER_LIST_REQUEST });
    expect(dispatch).toHaveBeenCalledWith({ type: USER_LIST_SUCCESS, payload: [response] });

    dispatch.mockClear();
    await deleteUser('user-1')(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith({ type: USER_DELETE_REQUEST });
    expect(dispatch).toHaveBeenCalledWith({ type: USER_DELETE_SUCCESS });

    dispatch.mockClear();
    await updateUser({ _id: 'user-1', name: 'Alice' })(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith({ type: USER_UPDATE_REQUEST });
    expect(dispatch).toHaveBeenCalledWith({ type: USER_UPDATE_SUCCESS });
    expect(dispatch).toHaveBeenCalledWith({ type: USER_DETAILS_SUCCESS, payload: response });
    expect(dispatch).toHaveBeenCalledWith({ type: USER_UPDATE_SUCCESS });
  });
});
