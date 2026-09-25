import api from '../../src/api/client';
import {
  createOrder,
  deliverOrder,
  getOrderDetails,
  listMyOrders,
  listOrders,
  payOrder,
} from '../../src/actions/orderActions';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from '../../src/constants/orderConstants';

jest.mock('../../src/api/client', () => ({
  __esModule: true,
  default: { get: jest.fn(), post: jest.fn(), put: jest.fn() },
}));

const getState = () => ({ userLogin: { userInfo: { token: 'token-1' } } });

test('loads the authenticated user order list', async () => {
  api.get.mockResolvedValue({ data: [] });
  const dispatch = jest.fn();
  await listMyOrders()(dispatch, getState);

  expect(api.get).toHaveBeenCalledWith('/api/orders/myorders', {
    headers: { Authorization: 'Bearer token-1' },
  });
  expect(dispatch).toHaveBeenNthCalledWith(1, { type: ORDER_LIST_MY_REQUEST });
  expect(dispatch).toHaveBeenNthCalledWith(2, { type: ORDER_LIST_MY_SUCCESS, payload: [] });
});

test('reports an order list failure', async () => {
  api.get.mockRejectedValue(new Error('offline'));
  const dispatch = jest.fn();
  await listMyOrders()(dispatch, getState);

  expect(dispatch).toHaveBeenLastCalledWith({ type: ORDER_LIST_MY_FAIL, payload: 'offline' });
});

test('creates, fetches, pays, delivers, and lists orders', async () => {
  const dispatch = jest.fn();
  api.post.mockResolvedValue({ data: { _id: 'order-1' } });
  api.put.mockResolvedValue({ data: { _id: 'order-1' } });
  await createOrder({ totalPrice: 10 })(dispatch, getState);
  expect(dispatch).toHaveBeenCalledWith({ type: ORDER_CREATE_REQUEST });
  expect(dispatch).toHaveBeenCalledWith({
    type: ORDER_CREATE_SUCCESS,
    payload: { _id: 'order-1' },
  });

  dispatch.mockClear();
  api.get.mockResolvedValue({ data: { _id: 'order-1' } });
  await getOrderDetails('order-1')(dispatch, getState);
  expect(dispatch).toHaveBeenCalledWith({ type: ORDER_DETAILS_REQUEST });
  expect(dispatch).toHaveBeenCalledWith({
    type: ORDER_DETAILS_SUCCESS,
    payload: { _id: 'order-1' },
  });

  dispatch.mockClear();
  await payOrder('order-1', { orderID: 'paypal-1' })(dispatch, getState);
  expect(dispatch).toHaveBeenCalledWith({ type: ORDER_PAY_REQUEST });
  expect(dispatch).toHaveBeenCalledWith({
    type: ORDER_PAY_SUCCESS,
    payload: { _id: 'order-1' },
  });

  dispatch.mockClear();
  await deliverOrder({ _id: 'order-1' })(dispatch, getState);
  expect(dispatch).toHaveBeenCalledWith({ type: ORDER_DELIVER_REQUEST });
  expect(dispatch).toHaveBeenCalledWith({
    type: ORDER_DELIVER_SUCCESS,
    payload: { _id: 'order-1' },
  });

  dispatch.mockClear();
  await listOrders()(dispatch, getState);
  expect(dispatch).toHaveBeenCalledWith({ type: ORDER_LIST_REQUEST });
  expect(dispatch).toHaveBeenCalledWith({
    type: ORDER_LIST_SUCCESS,
    payload: { _id: 'order-1' },
  });
});
