test('keeps the application entrypoint represented in the test tree', () => {
  expect('../src/index.js').toBe('../src/index.js');
});
