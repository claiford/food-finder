import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Tabs, Tab } from '@mui/material';
import axios from 'axios';
import SessionIncomplete from '../components/SessionIncomplete';
import SessionComplete from '../components/SessionComplete';
import SessionArchive from '../components/SessionArchive';

import AlbumRoundedIcon from '@mui/icons-material/AlbumRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

const Group = () => {
    const navigate = useNavigate();
    // ongoingSession
    // => incomplete : ongoing session in decision process
    // => complete   : ongoing session reached decision
    const [ongoingSession, setOngoingSession] = useState(null);
    const [archivedSessions, setArchivedSessions] = useState([])
    const [tabValue, setTabValue] = useState(0);

    /////////////////
    // NAVIGATION
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    /////////////////
    /////////////////

    /////////////////
    // DATA RETRIEVAL
    const getSessions = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/customer/group/groupid`);
            const sessions = res.data;

            setOngoingSession(sessions.find((s) => s.status !== "archive"));
            setArchivedSessions(sessions.filter((e) => e.status === "archive"));
        } catch (err) {
            console.log(err)
        }
    }
    /////////////////
    /////////////////

    /////////////////
    // HANDLERS
    // for ongoingSession, status: "incomplete" ==> "complete"
    const handleComplete = async () => {
        try {
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/session/${ongoingSession._id}/handle-complete`)
            console.log("handling complete");
            getSessions();
        } catch (err) {
            console.log(err)
        }
    }

    const handleArchive = async () => {
        try {
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/session/${ongoingSession._id}/handle-archive`)
            console.log("handling archive");
            getSessions();
        } catch (err) {
            console.log(err)
        }
    }
    /////////////////
    /////////////////

    useEffect(() => {
        getSessions();
    }, [])

    return (
        <Box className="group-page" sx={{ width: '400px', textAlign:'center' }}>
            <h1>Group name</h1>

            <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" aria-label="icon tabs">
                <Tab icon={<AlbumRoundedIcon />} aria-label="current" />
                <Tab icon={<HistoryRoundedIcon />} aria-label="archive" />
                <Tab icon={<AccountCircleRoundedIcon />} aria-label="members" />
            </Tabs>

            {/* Display current session */}
            {tabValue === 0 &&
                <>
                    <h2>Current Session</h2>
                    {ongoingSession ? (
                        <>
                            {ongoingSession.status === "incomplete" &&
                                <SessionIncomplete
                                    ongoingSession={ongoingSession}
                                    handleComplete={handleComplete}
                                />
                            }
                            {ongoingSession.status === "complete" &&
                                <SessionComplete
                                    ongoingSession={ongoingSession}
                                    handleArchive={handleArchive}
                                />
                            }
                        </>
                    ) : (
                        <Button onClick={() => navigate("/customer/session/new")}>
                            Start New Session
                        </Button>
                    )}
                </>
            }

            {/* Display archive sessions */}
            {tabValue === 1 &&
                <>  
                    <h2>Previous Sessions</h2>
                    <SessionArchive archivedSessions={archivedSessions}/>
                </>
            }

            {/* Display group members */}
            {tabValue === 2 &&
                <>
                    <h2>Members</h2>
                </>
            }

        </Box>

    )
};

export default Group;