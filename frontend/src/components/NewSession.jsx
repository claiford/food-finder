import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, IconButton, Modal, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';

import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

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

const NewSession = () => {
    const [alertOpen, setAlertOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newSession, setNewSession] = useState({})
    const navigate = useNavigate();

    const handleModalClose = () => {
        setAlertOpen(false);
        navigate("/customer/group/groupid")
    }

    const createNewSession = async (e) => {
        e.preventDefault()
        try {
            setLoading(true);
            // setTimeout(() => {
            //     setAlertOpen(true);
            //     setLoading(false);
            // }, 2000)
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/session/new`)
            console.log("POST RES", res);
            setNewSession(res.data)
            setAlertOpen(true);
            setLoading(false);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Modal open={alertOpen} onClose={handleModalClose}>
                <Box sx={modalStyle}>
                    <CheckCircleOutlineRoundedIcon color="success" />
                    <Typography variant='h6'>
                        New Session Generated
                    </Typography>
                    <IconButton onClick={handleModalClose} color="primary">
                        <ArrowBackRoundedIcon />
                    </IconButton>
                </Box>
            </Modal>
            <h1>Create Session</h1>
            <form onSubmit={createNewSession}>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    size="large"
                    disabled={loading}
                >
                    Create
                    {loading && (
                        <CircularProgress
                            size={24}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                            }}
                        />
                    )}
                </Button>

            </form>
        </>

    )
};

export default NewSession;