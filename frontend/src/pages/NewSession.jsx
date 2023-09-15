import { useState, useEffect } from 'react'
import { socket } from '../socket';

const NewSession = () => {
    const [connection, setConnection] = useState({
        isConnected: socket.connected,
        socketID: ""
    });

    useEffect(() => {
        socket.connect()

        socket.on("connect", () => {
            console.log(`connected as ${socket.id}`)
            setConnection({
                isConnected: socket.connected,
                socketID: socket.id,
            })
        });

        return () => {
            socket.disconnect();
        }
    }, [])

    return (
        <h1>New Session - {connection.socketID}</h1>
    )
};

export default NewSession;