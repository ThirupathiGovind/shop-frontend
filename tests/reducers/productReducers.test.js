import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
  productUpdateReducer,
} from '../../src/reducers/productReducers';
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
} from '../../src/constants/productConstants';

test('handles product listing and details lifecycle', () => {
  expect(productListReducer({}, { type: PRODUCT_LIST_REQUEST }))
    .toEqual({ loading: true, products: [] });
  expect(productListReducer({}, {
    type: PRODUCT_LIST_SUCCESS,
    payload: { products: [{ id: '1' }], page: 1, pages: 2 },
  })).toEqual({
    loading: false, products: [{ id: '1' }], page: 1, pages: 2,
  });
  expect(productListReducer({}, { type: PRODUCT_LIST_FAIL, payload: 'failed' }))
    .toEqual({ loading: false, error: 'failed' });
  expect(productDetailsReducer({}, { type: PRODUCT_DETAILS_REQUEST }))
    .toEqual({ loading: true });
  expect(productDetailsReducer({}, { type: PRODUCT_DETAILS_SUCCESS, payload: { id: '1' } }))
    .toEqual({ loading: false, product: { id: '1' } });
  expect(productDetailsReducer({}, { type: PRODUCT_DETAILS_FAIL, payload: 'failed' }))
    .toEqual({ loading: false, error: 'failed' });
});

test('handles product create, update, and delete lifecycle', () => {
  expect(productCreateReducer({}, { type: PRODUCT_CREATE_REQUEST })).toEqual({ loading: true });
  expect(productCreateReducer({}, { type: PRODUCT_CREATE_SUCCESS, payload: { id: '1' } }))
    .toEqual({ loading: false, success: true, product: { id: '1' } });
  expect(productCreateReducer({}, { type: PRODUCT_CREATE_FAIL, payload: 'failed' }))
    .toEqual({ loading: false, error: 'failed' });
  expect(productCreateReducer({}, { type: PRODUCT_CREATE_RESET })).toEqual({});
  expect(productUpdateReducer({}, { type: PRODUCT_UPDATE_REQUEST })).toEqual({ loading: true });
  expect(productUpdateReducer({}, { type: PRODUCT_UPDATE_SUCCESS, payload: { id: '1' } }))
    .toEqual({ loading: false, success: true, product: { id: '1' } });
  expect(productUpdateReducer({}, { type: PRODUCT_UPDATE_FAIL, payload: 'failed' }))
    .toEqual({ loading: false, error: 'failed' });
  expect(productUpdateReducer({}, { type: PRODUCT_UPDATE_RESET })).toEqual({ product: {} });
  expect(productDeleteReducer({}, { type: PRODUCT_DELETE_REQUEST })).toEqual({ loading: true });
  expect(productDeleteReducer({}, { type: PRODUCT_DELETE_SUCCESS }))
    .toEqual({ loading: false, success: true });
  expect(productDeleteReducer({}, { type: PRODUCT_DELETE_FAIL, payload: 'failed' }))
    .toEqual({ loading: false, error: 'failed' });
});

test('handles product review and top-rated lifecycle', () => {
  expect(productReviewCreateReducer({}, { type: PRODUCT_CREATE_REVIEW_REQUEST }))
    .toEqual({ loading: true });
  expect(productReviewCreateReducer({}, { type: PRODUCT_CREATE_REVIEW_SUCCESS }))
    .toEqual({ loading: false, success: true });
  expect(productReviewCreateReducer({}, { type: PRODUCT_CREATE_REVIEW_FAIL, payload: 'failed' }))
    .toEqual({ loading: false, error: 'failed' });
  expect(productReviewCreateReducer({}, { type: PRODUCT_CREATE_REVIEW_RESET })).toEqual({});
  expect(productTopRatedReducer({}, { type: PRODUCT_TOP_REQUEST }))
    .toEqual({ loading: true, products: [] });
  expect(productTopRatedReducer({}, { type: PRODUCT_TOP_SUCCESS, payload: [] }))
    .toEqual({ loading: false, products: [] });
  expect(productTopRatedReducer({}, { type: PRODUCT_TOP_FAIL, payload: 'failed' }))
    .toEqual({ loading: false, error: 'failed' });
});
