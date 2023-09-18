import { useState, useEffect } from 'react'
import { Button, Box, Modal } from '@mui/material';
import { socket } from '../socket';

import Swiper from './Swiper';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

const SessionIncomplete = ({ ongoingSession, handleComplete }) => {
    const [showSwiper, setShowSwiper] = useState(false)
    const [isConnected, setIsConnected] = useState(socket.connected);

    const handleJoinOngoing = () => {
        setShowSwiper(true);
        socket.connect();
    };

    const handleLeaveOngoing = () => {
        setShowSwiper(false);
        socket.disconnect();
    };

    useEffect(() => {
        function onConnect() {
            console.log(`connected as ${socket.id}`)
            setIsConnected(true);
        }

        function onDisconnect() {
            console.log(`disconnecting as ${socket.id}`)
            setIsConnected(false);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, [])

    return (
        <>
            <Button variant="contained" onClick={handleJoinOngoing}>
                Join Ongoing Session
            </Button>
            <Modal
                open={showSwiper}
                onClose={handleLeaveOngoing}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={modalStyle}>
                    <h4>New Session - {socket.id}</h4>
                    <Swiper candidates={ongoingSession.candidates} handleComplete={handleComplete}/>
                </Box>
            </Modal>
        </>
    )
};

export default SessionIncomplete;