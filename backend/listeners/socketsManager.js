const onConnect = (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.join(`room${socket.id}`)

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
};

module.exports = {
    onConnect,
}