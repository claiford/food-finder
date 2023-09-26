import { useState, useEffect } from 'react'
import { Button, Box, Modal, Typography } from '@mui/material';
import { socket } from '../socket';

import Swiper from './Swiper';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    minHeight: '70%',
    bgcolor: 'darkgray.main',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

const SessionIncomplete = ({ ongoingSession, handleVoting }) => {
    const [showSwiper, setShowSwiper] = useState(false)
    // const [isConnected, setIsConnected] = useState(socket.connected);
    const isUserComplete = ongoingSession.voters.find((voter) => voter.voter.toString() === localStorage.getItem("token"))?.status === 999;
    const voterStatus = ongoingSession.voters.filter((voter) => voter.status === 999);

    const handleJoinOngoing = () => {
        setShowSwiper(true);
        // socket.connect();
    };

    const handleLeaveOngoing = () => {
        setShowSwiper(false);
        // socket.disconnect();
    };

    const handleCompleteSwiping = (votes) => {
        handleLeaveOngoing();
        handleVoting(votes);
    }

    // useEffect(() => {
    //     function onConnect() {
    //         console.log(`connected as ${socket.id}`)
    //         setIsConnected(true);
    //     }

    //     function onDisconnect() {
    //         console.log(`disconnecting as ${socket.id}`)
    //         setIsConnected(false);
    //     }

    //     socket.on('connect', onConnect);
    //     socket.on('disconnect', onDisconnect);

    //     return () => {
    //         socket.off('connect', onConnect);
    //         socket.off('disconnect', onDisconnect);
    //     };
    // }, [])

    return (
        <>
            <Box sx={{
                borderRadius: 3,
                m: 3,
                p: 3,
                backgroundColor: "lightgray.main",
            }}>
                {isUserComplete ? (
                    <Button
                        variant="contained"
                    >
                        Waiting
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        onClick={handleJoinOngoing}
                    >
                        Join
                    </Button>
                )}

                <Box sx={{
                    mt: 2,
                }}>
                    <Typography variant="header1" component="div">
                        {ongoingSession.origin}
                    </Typography>
                    <Typography variant="header1" component="div">
                        {voterStatus.length} / {ongoingSession.voters.length}
                    </Typography>
                </Box>
            </Box>

            {/* SWIPER MODAL */}
            <Modal
                open={showSwiper}
                onClose={handleLeaveOngoing}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={modalStyle}>
                    {/* <h4>New Session - {socket.id}</h4> */}
                    <Swiper candidates={ongoingSession.candidates} handleCompleteSwiping={handleCompleteSwiping} />
                </Box>
            </Modal>
        </>
    )
};

export default SessionIncomplete;