import api from '../../src/api/client';
import {
  createProduct,
  createProductReview,
  deleteProduct,
  listProductDetails,
  listProducts,
  listTopProducts,
  updateProduct,
} from '../../src/actions/productActions';
import {
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from '../../src/constants/productConstants';

jest.mock('../../src/api/client', () => ({
  __esModule: true,
  default: {
    get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn(),
  },
}));

const getState = () => ({ userLogin: { userInfo: { token: 'token-1' } } });

test('loads product pages and dispatches request lifecycle actions', async () => {
  api.get.mockResolvedValue({ data: { products: [], page: 1, pages: 1 } });
  const dispatch = jest.fn();

  await listProducts('phone', 2)(dispatch);

  expect(api.get).toHaveBeenCalledWith('/api/products?keyword=phone&pageNumber=2');
  expect(dispatch).toHaveBeenNthCalledWith(1, { type: PRODUCT_LIST_REQUEST });
  expect(dispatch).toHaveBeenNthCalledWith(2, {
    type: PRODUCT_LIST_SUCCESS,
    payload: { products: [], page: 1, pages: 1 },
  });
});

test('dispatches a readable failure when product loading fails', async () => {
  api.get.mockRejectedValue(new Error('offline'));
  const dispatch = jest.fn();

  await listProducts()(dispatch);

  expect(dispatch).toHaveBeenLastCalledWith({ type: PRODUCT_LIST_FAIL, payload: 'offline' });
});

test('runs product detail, admin, update, review, and top-product success flows', async () => {
  const dispatch = jest.fn();
  api.get.mockResolvedValue({ data: { _id: '1', name: 'Phone' } });
  api.post.mockResolvedValue({ data: { _id: '1', name: 'Phone' } });
  api.put.mockResolvedValue({ data: { _id: '1', name: 'Updated Phone' } });
  api.delete.mockResolvedValue({});

  await listProductDetails('1')(dispatch);
  expect(dispatch).toHaveBeenCalledWith({ type: PRODUCT_DETAILS_REQUEST });
  expect(dispatch).toHaveBeenCalledWith({
    type: PRODUCT_DETAILS_SUCCESS,
    payload: { _id: '1', name: 'Phone' },
  });

  dispatch.mockClear();
  await deleteProduct('1')(dispatch, getState);
  expect(dispatch).toHaveBeenCalledWith({ type: PRODUCT_DELETE_REQUEST });
  expect(dispatch).toHaveBeenCalledWith({ type: PRODUCT_DELETE_SUCCESS });

  dispatch.mockClear();
  await createProduct()(dispatch, getState);
  expect(dispatch).toHaveBeenCalledWith({ type: PRODUCT_CREATE_REQUEST });
  expect(dispatch).toHaveBeenCalledWith({
    type: PRODUCT_CREATE_SUCCESS,
    payload: { _id: '1', name: 'Phone' },
  });

  dispatch.mockClear();
  const product = { _id: '1', name: 'Updated Phone' };
  await updateProduct(product)(dispatch, getState);
  expect(dispatch).toHaveBeenCalledWith({ type: PRODUCT_UPDATE_REQUEST });
  expect(dispatch).toHaveBeenCalledWith({ type: PRODUCT_UPDATE_SUCCESS, payload: product });
  expect(dispatch).toHaveBeenCalledWith({ type: PRODUCT_DETAILS_SUCCESS, payload: product });

  dispatch.mockClear();
  await createProductReview('1', { rating: 5, comment: 'Great' })(dispatch, getState);
  expect(dispatch).toHaveBeenCalledWith({ type: PRODUCT_CREATE_REVIEW_REQUEST });
  expect(dispatch).toHaveBeenCalledWith({ type: PRODUCT_CREATE_REVIEW_SUCCESS });

  dispatch.mockClear();
  await listTopProducts()(dispatch);
  expect(dispatch).toHaveBeenCalledWith({ type: PRODUCT_TOP_REQUEST });
  expect(dispatch).toHaveBeenCalledWith({
    type: PRODUCT_TOP_SUCCESS,
    payload: { _id: '1', name: 'Phone' },
  });
});
