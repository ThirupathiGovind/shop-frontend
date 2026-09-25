import {
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderListReducer,
  orderPayReducer,
} from '../../src/reducers/orderReducers';
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_RESET,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
} from '../../src/constants/orderConstants';

test('handles order creation lifecycle', () => {
  expect(orderCreateReducer({}, { type: ORDER_CREATE_REQUEST })).toEqual({ loading: true });
  expect(orderCreateReducer({}, { type: ORDER_CREATE_SUCCESS, payload: { id: '1' } }))
    .toEqual({ loading: false, success: true, order: { id: '1' } });
  expect(orderCreateReducer({}, { type: ORDER_CREATE_FAIL, payload: 'failed' }))
    .toEqual({ loading: false, error: 'failed' });
  expect(orderCreateReducer({}, { type: ORDER_CREATE_RESET })).toEqual({});
});

test('handles order details and payment lifecycle', () => {
  expect(orderDetailsReducer({}, { type: ORDER_DETAILS_REQUEST })).toMatchObject({ loading: true });
  expect(orderDetailsReducer({}, { type: ORDER_DETAILS_SUCCESS, payload: { id: '1' } }))
    .toEqual({ loading: false, order: { id: '1' } });
  expect(orderDetailsReducer({}, { type: ORDER_DETAILS_FAIL, payload: 'failed' }))
    .toEqual({ loading: false, error: 'failed' });
  expect(orderPayReducer({}, { type: ORDER_PAY_REQUEST })).toEqual({ loading: true });
  expect(orderPayReducer({}, { type: ORDER_PAY_SUCCESS }))
    .toEqual({ loading: false, success: true });
  expect(orderPayReducer({}, { type: ORDER_PAY_FAIL, payload: 'failed' }))
    .toEqual({ loading: false, error: 'failed' });
  expect(orderPayReducer({}, { type: ORDER_PAY_RESET })).toEqual({});
});

test('handles delivery and order list lifecycle', () => {
  expect(orderDeliverReducer({}, { type: ORDER_DELIVER_REQUEST })).toEqual({ loading: true });
  expect(orderDeliverReducer({}, { type: ORDER_DELIVER_SUCCESS }))
    .toEqual({ loading: false, success: true });
  expect(orderDeliverReducer({}, { type: ORDER_DELIVER_FAIL, payload: 'failed' }))
    .toEqual({ loading: false, error: 'failed' });
  expect(orderDeliverReducer({}, { type: ORDER_DELIVER_RESET })).toEqual({});
  expect(orderListMyReducer({}, { type: ORDER_LIST_MY_REQUEST })).toEqual({ loading: true });
  expect(orderListMyReducer({}, { type: ORDER_LIST_MY_SUCCESS, payload: [] }))
    .toEqual({ loading: false, orders: [] });
  expect(orderListMyReducer({}, { type: ORDER_LIST_MY_FAIL, payload: 'failed' }))
    .toEqual({ loading: false, error: 'failed' });
  expect(orderListMyReducer({}, { type: ORDER_LIST_MY_RESET })).toEqual({ orders: [] });
  expect(orderListReducer({}, { type: ORDER_LIST_REQUEST })).toEqual({ loading: true });
  expect(orderListReducer({}, { type: ORDER_LIST_SUCCESS, payload: [] }))
    .toEqual({ loading: false, orders: [] });
  expect(orderListReducer({}, { type: ORDER_LIST_FAIL, payload: 'failed' }))
    .toEqual({ loading: false, error: 'failed' });
});
