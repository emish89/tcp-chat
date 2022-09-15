import { NestedArray } from './types';

/* 
This is a function that takes a NestedArray and returns a flat Array.
The simplest implementation is JS is to use the array.flat(Infinity) 
method, but I wanted to implement it myself for this test.
*/
export const flatArray = <T>(arr: NestedArray<T>): Array<T> => {
  //if array is of wrong type, return object
  if (!Array.isArray(arr)) {
    return arr;
  }
  //else I flat of 1 level the array recursively
  //any type used to solve ts error
  return (arr as any[]).reduce<Array<T>>((acc: Array<T>, val: NestedArray<T>) => acc.concat(flatArray(val)), []);
};
