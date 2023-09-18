import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Tabs, Tab } from '@mui/material';
import axios from 'axios';
import SessionIncomplete from '../components/SessionIncomplete';
import SessionComplete from '../components/SessionComplete';

import AlbumRoundedIcon from '@mui/icons-material/AlbumRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

const Group = () => {
    const navigate = useNavigate();
    // ongoingSession
    // => incomplete : ongoing session in decision process
    // => complete   : ongoing session reached decision
    const [ongoingSession, setOngoingSession] = useState({});
    const [archivedSessions, setArchivedSessions] = useState([])
    const [tabValue, setTabValue] = useState(0);

    const getSessions = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/customer/group/groupid`);
            const sessions = res.data;

            setOngoingSession(sessions.find((s) => s.status !== "archived"));
            setArchivedSessions(sessions.filter((e) => e.status === "archived"));
        } catch (err) {
            console.log(err)
        }
    }

    // for ongoingSession, status: "incomplete" ==> "complete"
    const handleComplete = async () => {
        try {
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/session/${ongoingSession._id}/handle-complete`)
            console.log("handling complete");
            setOngoingSession((prev) => {
                return ({
                    ...prev,
                    "status": "complete",
                })
            })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getSessions();
    }, [])

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <>
            <h1>Group page</h1>

            <Tabs value={tabValue} onChange={handleChange} aria-label="icon tabs example">
                <Tab icon={<AlbumRoundedIcon />} aria-label="phone" />
                <Tab icon={<HistoryRoundedIcon />} aria-label="favorite" />
                <Tab icon={<AccountCircleRoundedIcon />} aria-label="person" />
            </Tabs>

            {/* Display current session */}
            {tabValue === 0 &&
                <>
                    <h2>Ongoing Session</h2>
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

            {/* Display previous sessions */}
            {tabValue === 1 &&
                <>
                    <h2>Previous sessions</h2>
                </>
            }

            {/* Display group members */}
            {tabValue === 2 &&
                <>
                    <h2>Members</h2>
                </>
            }

        </>

    )
};

export default Group;