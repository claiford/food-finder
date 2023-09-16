import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const NewSession = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
    }

    const createNewSession = async (e) => {
        e.preventDefault()
        try {
            setOpen(true)
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/session/new`)
            setOpen(false);
            navigate("/tempsession")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Snackbar open={open} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                </Alert>
            </Snackbar>
            <h1>Make New Session</h1>
            <form onSubmit={createNewSession}>
                <TextField />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    size="large"
                    sx={{ marginTop: "1rem", marginBottom: "2rem" }}
                >
                    Create
                </Button>
            </form>
        </>

    )
};

export default NewSession;