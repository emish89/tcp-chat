import { Socket } from 'net';

// NestedArray<T> represents T or Array of T or Array of Array of T ...
export type NestedArray<T> = Array<T> | Array<NestedArray<T>>;

export type SocketEnrichedType = Socket & { nickName: string };
