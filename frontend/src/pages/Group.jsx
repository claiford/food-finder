import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, IconButton, Tabs, Tab, Typography } from '@mui/material';
import axios from 'axios';

import { AuthContext } from '../contexts/AuthContext';
import GroupContext from './GroupContext';
import SessionNew from '../components/SessionNew';
import SessionIncomplete from '../components/SessionIncomplete';
import SessionComplete from '../components/SessionComplete';
import SessionArchive from '../components/SessionArchive';

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import AlbumRoundedIcon from '@mui/icons-material/AlbumRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import GroupMembers from '../components/GroupMembers';

const TabHeader = ({ text }) => {
    return (
        <Typography
            variant="header2"
            component="div"
            sx={{
                m: 3,
                textAlign: 'center',
            }}
        >
            {text}
        </Typography>
    )
}

const Group = () => {
    const navigate = useNavigate();
    // ongoingSession
    // => incomplete : ongoing session in decision process
    // => complete   : ongoing session reached decision
    const [group, setGroup] = useState({});
    const [ongoingSession, setOngoingSession] = useState(null);
    const [archivedSessions, setArchivedSessions] = useState([]);
    const [tabValue, setTabValue] = useState(0);

    const { customerInfo } = useContext(AuthContext)

    /////////////////
    // PARAMS
    const { group_id } = useParams();
    /////////////////
    /////////////////

    /////////////////
    // NAVIGATION
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        refreshData()
    };

    const handlePageBack = () => {
        navigate("/customer/home");
    }
    /////////////////
    /////////////////

    /////////////////
    // DATA RETRIEVAL
    const refreshData = () => {
        console.log("Refreshing Group and Sessions Data")
        getGroup();
        getSessions();
    }

    const getGroup = async () => {
        console.log("getting group")
        try {
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
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/session/${ongoingSession._id}/handle-voting`, { voter: customerInfo._id, votes: votes })
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
        <GroupContext.Provider value={{ refreshData }}>
            <Box className="group-page" sx={{
                width: "90%",
                maxWidth: '350px',
                height: "100%",
                maxHeight: '800px',
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <IconButton onClick={handlePageBack}>
                        <ArrowBackRoundedIcon color="lime" fontSize="large" />
                    </IconButton>
                    <Typography
                        variant="title1"
                        component="div"
                        sx={{
                            m: 3,
                            textAlign: 'center'
                        }}
                    >
                        {group.name}
                    </Typography>
                    <IconButton disabled>
                        {/* placeholder icon to occupy space */}
                        <ArrowBackRoundedIcon color="darkgray" fontSize="large" />
                    </IconButton>
                </Box>


                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="fullWidth"
                    TabIndicatorProps={{
                        sx: {
                            bgcolor: 'lime.main',
                        },
                    }}
                >
                    <Tab icon={<AlbumRoundedIcon color="lime" />} aria-label="current" />
                    <Tab icon={<HistoryRoundedIcon color="lime" />} aria-label="archive" />
                    <Tab icon={<AccountCircleRoundedIcon color="lime" />} aria-label="members" />
                </Tabs>

                {/* Display current session */}
                {tabValue === 0 &&
                    <>
                        <TabHeader text="Current"></TabHeader>
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
                            <SessionNew refreshData={refreshData} />
                        )}
                    </>
                }

                {/* Display archive sessions */}
                {tabValue === 1 &&
                    <>
                        <TabHeader text="Archive"></TabHeader>
                        <SessionArchive archivedSessions={archivedSessions} />
                    </>
                }

                {/* Display group members */}
                {tabValue === 2 &&
                    <>
                        <TabHeader text="Members"></TabHeader>
                        <GroupMembers members={group.members} />
                    </>
                }
            </Box>
        </GroupContext.Provider >
    )
};

export default Group;