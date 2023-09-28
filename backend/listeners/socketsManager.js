const onConnect = (socket) => {
    console.log(`User connected: ${socket.id}`);
    // socket.join('troom');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
};

module.exports = {
    onConnect,
}