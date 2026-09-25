import * as constants from '../../src/constants/productConstants';

test('exports stable product lifecycle types', () => {
  expect(constants.PRODUCT_LIST_REQUEST).toBe('PRODUCT_LIST_REQUEST');
  expect(constants.PRODUCT_DETAILS_SUCCESS).toBe('PRODUCT_DETAILS_SUCCESS');
  expect(constants.PRODUCT_CREATE_REVIEW_RESET).toBe('PRODUCT_CREATE_REVIEW_RESET');
});
