import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Tabs, Tab } from '@mui/material';
import axios from 'axios';
import SessionIncomplete from '../components/SessionIncomplete';
import SessionComplete from '../components/SessionComplete';
import SessionArchive from '../components/SessionArchive';

import AlbumRoundedIcon from '@mui/icons-material/AlbumRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import GroupMembers from '../components/GroupMembers';

const Group = () => {
    const navigate = useNavigate();
    // ongoingSession
    // => incomplete : ongoing session in decision process
    // => complete   : ongoing session reached decision
    const [group, setGroup] = useState({});
    const [ongoingSession, setOngoingSession] = useState(null);
    const [archivedSessions, setArchivedSessions] = useState([]);
    const [tabValue, setTabValue] = useState(0);

    /////////////////
    // PARAMS
    const { group_id } = useParams();
    /////////////////
    /////////////////

    /////////////////
    // NAVIGATION
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    /////////////////
    /////////////////

    /////////////////
    // DATA RETRIEVAL
    const getGroup = async () => {
        try {
            console.log("getting group info")
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/customer/group/${group_id}`);
            setGroup(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const getSessions = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/customer/group/${group_id}/sessions`); 
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
    const handleVoting = async (votes) => {
        try {
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/session/${ongoingSession._id}/handle-voting`, {votes: votes})
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
        getGroup()
        getSessions();
    }, [])

    return (
        <Box className="group-page" sx={{ width: '400px', textAlign:'center' }}>
            <h1>{group.groupName}</h1>

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
                                    handleVoting={handleVoting}
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
                        <Button variant="contained" onClick={() => navigate(`/customer/group/${group_id}/session/new`)}>
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
                    <GroupMembers members={group.memberIds}/>
                </>
            }

        </Box>

    )
};

export default Group;