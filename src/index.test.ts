import { Socket } from 'net';
import { createGuest, removeSocket, sendMessage, serverConnectionListener } from '.';
import { SocketEnrichedType } from './types';

describe('tcp chat', () => {
  it('should return a correct guest name', () => {
    const guestId = 0;
    const socket1: SocketEnrichedType = createGuest(new Socket(), guestId);
    expect(socket1.nickName).toBe('guest-1');
    const socket2: SocketEnrichedType = createGuest(new Socket(), guestId);
    expect(socket2.nickName).toBe('guest-2');
  });

  it('should test serverConnectionListener', () => {
    const socket = jest.fn() as any;
    socket.write = jest.fn();
    socket.on = jest.fn();
    serverConnectionListener(socket);
    expect(socket.write).toBeCalled();
    expect(socket.on).toBeCalled();
  });

  it('should test sendMessage with empty socket array', () => {
    const socket = jest.fn() as any;
    socket.write = jest.fn();
    sendMessage('guest-1', 'Hello', []);
    expect(socket.write).not.toBeCalled();
  });

  it('should test sendMessage with correct message', () => {
    const socket = jest.fn() as any;
    socket.write = jest.fn();
    sendMessage('guest1', 'Hello', [socket]);
    expect(socket.write).toBeCalled();
  });

  it('should test sendMessage with same sender', () => {
    const socket = jest.fn() as any;
    socket.write = jest.fn();
    socket.nickName = 'guest-1';
    sendMessage('guest-1', 'Hello', [socket]);
    expect(socket.write).not.toBeCalled();
  });

  it('should test removeSocket in working conditions', () => {
    const socket = new Socket() as SocketEnrichedType;
    socket.nickName = 'guest-1';
    const sockets = [socket];
    expect(removeSocket(socket, sockets).length).toBe(0);
  });

  it('should test removeSocket with empty socket array', () => {
    const socket = new Socket() as SocketEnrichedType;
    const sockets: any = [];

    expect(removeSocket(socket, sockets).length).toBe(0);
  });

  it('should test removeSocket with undefined socket array', () => {
    const socket = new Socket() as SocketEnrichedType;
    const sockets = undefined as any;
    expect(removeSocket(socket, sockets)).toBeUndefined();
  });

  it('should test removeSocket with undefined socket', () => {
    const socket = undefined as any;
    const sockets = [new Socket() as SocketEnrichedType];
    expect(removeSocket(socket, sockets).length).toBe(1);
  });

  it('should test removeSocket with undefined socket ', () => {
    const socket = new Socket() as SocketEnrichedType;
    socket.nickName = 'guest-2';
    const sockets = [new Socket() as SocketEnrichedType];
    expect(removeSocket(socket, sockets).length).toBe(1);
  });
});
