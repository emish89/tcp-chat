import { flatArray } from './utilities';

describe('flat array of any type', () => {
  it('should return a flat array of integer as expected', () => {
    expect(flatArray([1, 2, 3, [4]])).toStrictEqual([1, 2, 3, 4]);
  });

  it('should return undefined if param is undefined', () => {
    expect(flatArray(undefined as any)).toBeUndefined();
  });

  it('should return the obj if not array', () => {
    expect(flatArray('1234' as any)).toBe('1234');
  });

  it('should return a flat array of integer if is already a flat array', () => {
    expect(flatArray([1, 2, 3, 4])).toStrictEqual([1, 2, 3, 4]);
  });

  it('should return a flat array of mixed objects as expected', () => {
    expect(flatArray(['a', 1, 'c', [4]])).toStrictEqual(['a', 1, 'c', 4]);
  });

  it('should return a flat array with nested argument', () => {
    expect(flatArray([1, [2], [3, [[4]]]])).toStrictEqual([1, 2, 3, 4]);
  });
});
