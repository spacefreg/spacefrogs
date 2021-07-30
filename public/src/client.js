let socket = io();

socket.on('server-pulse', numUsers => {
    console.log('pulse from server (connected users count): ' + numUsers);
});

socket.on('server-welcome', message => {
    console.log(message);
});