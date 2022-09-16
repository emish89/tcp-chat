# tcp-chat

very simple chat server that should listen on TCP port 10000 for clients.
clients connect with "telnet" and write single lines of text. On each new line of text, the server will broadcast that line to all other connected clients

## Usage

### To locally run:

    $ npm install
    $ npm start

### To run tests:

      $ npm test

### To build and start for production:

    $ npm run build
    $ npm run start

## Once launched

### You can connect to the server with telnet:

    $ telnet localhost 10000

### Commands available in the chat:

    $ help                              - list all commands
    $ whoami                         - return my username
    $ exit                               - disconnect from the server
    $ give me the answer       - return the answer to question 3
    $ array                            - return the flattened array
