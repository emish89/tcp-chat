import { createServer, Socket } from 'net';
import { SocketEnrichedType } from './types';

let sockets: SocketEnrichedType[] = [];
const port = 10000;
let guestId = 0;

//create new chat guest with incremental number
export const createGuest: (socket: Socket, guestId: number) => SocketEnrichedType = (socket) => {
  guestId++;
  const socketEnriched: SocketEnrichedType = socket as SocketEnrichedType;
  socketEnriched.nickName = `guest-${guestId}`;
  return socketEnriched;
};

//send message to all sockets except sender
export const sendMessage = (sender: string, message: string, sockets: SocketEnrichedType[]) => {
  if (sockets.length === 0) {
    console.log('No one left in the chat');
    return;
  }

  sockets.forEach((socket) => {
    if (socket.nickName === sender) return;
    socket.write(message);
  });
};

//remove socket from sockets array (based un nickName)
export const removeSocket: (socket: SocketEnrichedType, socketsArray: SocketEnrichedType[]) => SocketEnrichedType[] = (
  socket: SocketEnrichedType,
  socketsArray: SocketEnrichedType[],
) => (socket?.nickName ? socketsArray?.filter((s) => s.nickName !== socket?.nickName) : socketsArray);

//handle new server connection
export const serverConnectionListener = (socket: Socket) => {
  const socketEnriched = createGuest(socket, guestId);
  sockets.push(socketEnriched);
  const nickName = socketEnriched.nickName;
  socketEnriched.write('Welcome ' + nickName + ' to the chat!\n');
  sendMessage(nickName, `${nickName} joined this chat.\n`, sockets);

  socketEnriched.on('data', (data: Buffer) => {
    sendMessage(nickName, `${nickName}> ${data.toString()}`, sockets);
  });
  socketEnriched.on('end', () => {
    console.log('here');
    sockets = removeSocket(socketEnriched, sockets);
    const nickName = socketEnriched.nickName;
    sendMessage(nickName, `${nickName} left this chat\n`, sockets);
  });

  socketEnriched.on('error', (error: Error) => {
    console.log('Socket got problems: ', error.message);
  });
};

const server = createServer(serverConnectionListener);

server.on('error', (error: Error) => {
  console.log('So we got problems!', error.message);
});

// In the terminal just run 'telnet localhost 10000' to connect to the server
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
