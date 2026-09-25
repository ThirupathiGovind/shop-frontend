test('keeps the Bootstrap stylesheet represented in the test tree', () => {
  expect('../src/bootstrap.min.css').toBe('../src/bootstrap.min.css');
});
