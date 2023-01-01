import { sum } from './sum';

test('Zero Sum', () => {
  expect(sum()).toBe(0);
});

test('1 + 2 results in 3', () => {
  expect(sum(1, 2)).toBe(3);
});
