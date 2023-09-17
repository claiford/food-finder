import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';
import SessionIncomplete from './SessionIncomplete';
import SessionComplete from './SessionComplete';


const Group = () => {
    const navigate = useNavigate();
    // ongoingSession
    // => incomplete : ongoing session in decision process
    // => complete   : ongoing session reached decision
    const [ongoingSession, setOngoingSession] = useState("");
    const [archivedSessions, setArchivedSessions] = useState([])

    const getSessions = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/sessions`);
            const sessions = res.data;

            setOngoingSession(sessions.find((s) => s.status !== "archived"));
            setArchivedSessions(sessions.filter((e) => e.status === "archived"));
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getSessions();
    }, [])


    return (
        <>
            <h1>Group page</h1>

            {/* Display group members */}
            <h2>Members</h2>

            {/* Display current session */}
            {ongoingSession ? (
                <>
                    {ongoingSession.status === "incomplete" &&
                        <SessionIncomplete
                            ongoingSession={ongoingSession}
                        />
                    }
                    {ongoingSession.status === "complete" &&
                        <SessionComplete
                            ongoingSession={ongoingSession}
                        />
                    }
                </>
            ) : (
                <Button onClick={() => navigate("/customer/session/new")}>
                    Start New Session
                </Button>
            )}

            {/* Display previous sessions */}
            <h2>Previous sessions</h2>
        </>

    )
};

export default Group;