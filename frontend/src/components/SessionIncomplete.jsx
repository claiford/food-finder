import { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { DateTime } from "luxon";
import { socket } from '../socket';

import { AuthContext } from '../contexts/AuthContext';
import Swiper from './Swiper';

import {
    Button,
    Box,
    Stack,
    Modal,
    Typography,
    LinearProgress
} from '@mui/material';

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
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

const SessionIncomplete = ({ ongoingSession, handleVoting, handleDelete }) => {
    const [showSwiper, setShowSwiper] = useState(false)
    // const [isConnected, setIsConnected] = useState(socket.connected);\

    const { customerInfo } = useContext(AuthContext);
    const isUserComplete = ongoingSession.voters.find((voter) => voter.voter.toString() === customerInfo._id)?.status === 999;
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
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                alignItems: 'center',
                borderRadius: 3,
                m: 3,
                p: 3,
                backgroundColor: "lightgray.main",
            }}>
                <Box sx={{ width: "70%" }}>
                    <LinearProgress
                        variant="determinate"
                        value={(voterStatus.length / ongoingSession.voters.length) * 100}
                        color="success"
                        sx={{ backgroundColor: "lime.dark", mb: 1 }}
                    />
                </Box>
                {isUserComplete ? (
                    <Button
                        variant="contained"
                    >
                        Waiting . . .
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        onClick={handleJoinOngoing}
                    >
                        Join
                    </Button>
                )}

                <Typography variant="header1" sx={{ textAlign: 'center' }}>
                    {ongoingSession.origin}
                </Typography>
                <Typography variant="header1" fontWeight={700}>
                    {voterStatus.length} / {ongoingSession.voters.length}
                </Typography>

                <Box sx={{
                    width: "100%",
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    mt: 2,
                }}>
                    <Stack direction="column" sx={{ textAlign: 'left' }}>
                        <Typography variant="caption1">
                            {DateTime.fromISO(ongoingSession.createdAt).toLocaleString({ hour: 'numeric', minute: '2-digit' })}
                        </Typography>
                        <Typography variant="caption1">
                            {DateTime.fromISO(ongoingSession.createdAt).toLocaleString({ weekday: 'short', month: 'short', day: '2-digit' })}
                        </Typography>
                    </Stack>
                    <Button
                        variant="contained"
                        color='error'
                        size="small"
                        onClick={() => handleDelete(ongoingSession._id)}
                        sx={{backgroundColor: "darkgray.main", color: "lightgray.main"}}
                    >
                        Abort
                    </Button>
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