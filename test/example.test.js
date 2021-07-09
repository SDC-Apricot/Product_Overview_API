test('adds 1 + 1 to equal 2', () => {
  function sum(a, b) {
    return a + b;
  }
  expect(sum(1, 1)).toBe(2)
});