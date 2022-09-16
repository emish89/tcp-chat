import { Socket } from 'net';
import { createGuest, isValidArray, manageDataBuffer, removeSocket, sendMessage, serverConnectionListener } from '.';
import { answer } from './q3';
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

  it('should test isValidArray with a valid array ', () => {
    expect(isValidArray('[1,2,3]')).toBeTruthy();
  });

  it('should test isValidArray with a not valid array ', () => {
    expect(isValidArray('{[1,2,3]}')).toBeFalsy();
  });

  it('should test isValidArray with a normal obj ', () => {
    expect(isValidArray('{}')).toBeFalsy();
  });

  it('should test isValidArray with a string', () => {
    expect(isValidArray('1,2,3')).toBeFalsy();
  });

  it('should test manageDataBuffer case standard message', () => {
    const socket = new Socket() as SocketEnrichedType;
    socket.write = jest.fn();
    const data = Buffer.from('Hello');
    manageDataBuffer(data, socket);
    expect(socket.write).not.toBeCalled();
  });

  it('should test manageDataBuffer case exit', () => {
    const socket = new Socket() as SocketEnrichedType;
    socket.end = jest.fn();
    const data = Buffer.from('exit');
    manageDataBuffer(data, socket);
    expect(socket.end).toHaveBeenCalled();
  });

  it('should test manageDataBuffer case whoami', () => {
    const socket = new Socket() as SocketEnrichedType;
    socket.write = jest.fn();
    const nickName = 'guest-1';
    socket.nickName = nickName;
    const data = Buffer.from('whoami');
    manageDataBuffer(data, socket);
    expect(socket.write).toHaveBeenCalledWith(`You are ${nickName}\n`);
  });

  it('should test manageDataBuffer case give me the answer', () => {
    const socket = new Socket() as SocketEnrichedType;
    socket.write = jest.fn();
    const data = Buffer.from('give me the answer');
    manageDataBuffer(data, socket);
    expect(socket.write).toHaveBeenCalledWith(answer);
  });

  it('should test manageDataBuffer case help', () => {
    const socket = new Socket() as SocketEnrichedType;
    socket.write = jest.fn();
    const data = Buffer.from('help');
    manageDataBuffer(data, socket);
    expect(socket.write).toHaveBeenCalled();
  });
});
