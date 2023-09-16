import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';
import OngoingSession from './OngoingSession';

const TempSession = () => {
    const navigate = useNavigate();
    const [ongoingSession, setOngoingSession] = useState({
        status: false,
        candidates: []
    })

    const [showSwiper, setShowSwiper] = useState(false)

    const handleJoin = () => {
        setShowSwiper(true);
    }

    const getOngoingSession = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/session/ongoing`);
            setOngoingSession({
                status: true,
                candidates: res.data
            });
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getOngoingSession();
    }, [])


    return (
        <>
            <h1>Group page</h1>
            
            {ongoingSession.status ? (
                <>
                    <Button onClick={handleJoin}>
                        Join Ongoing Session
                    </Button>
                    {showSwiper && <OngoingSession ongoingSession={ongoingSession} />}
                </>
            ) : (
                <Button onClick={() => navigate("/customer/session/new")}>
                    Start New Session
                </Button>
            )}
        </>

    )
};

export default TempSession;