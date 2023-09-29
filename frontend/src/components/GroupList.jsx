import { useNavigate } from "react-router-dom";
import axios from 'axios';

import {
    Box,
    Stack,
    IconButton,
    Typography,
    LinearProgress
} from "@mui/material";
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

const GroupList = ({ groups, inSession, handleDeleteGroup }) => {
    const navigate = useNavigate();

    const groupLinks = groups.map((group, i) => {
        const isInSession = inSession.some((g) => g._id === group._id);
        return (
            <Stack key={i} direction={"row"} spacing={0}>
                <Box
                    onClick={() => navigate(`/customer/group/${group._id}`)}
                    sx={{
                        width: "90%",
                        display: 'flex',
                        alignItems: 'center',
                        borderTopLeftRadius: "12px",
                        borderBottomLeftRadius: "12px",
                        py: 2,
                        px: 3,
                        gap: 2,
                        backgroundColor: isInSession ? "lime.main" : "black",
                        '&:hover': {
                            cursor: 'pointer',
                        }
                    }}
                >
                    <GroupWorkIcon color={isInSession ? "success" : "lime"} />
                    <Typography variant="body2" fontWeight={700} sx={{ color: isInSession ? "black" : "white" }}>
                        {group.name}
                    </Typography>
                    {isInSession &&
                        <Box sx={{ width: "10%", ml: 'auto' }}>
                            <LinearProgress color="success" sx={{ backgroundColor: "lime.dark" }} />
                        </Box>
                    }
                </Box>
                <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        pr: 2,
                        borderTopRightRadius: "12px",
                        borderBottomRightRadius: "12px",
                        backgroundColor: isInSession ? "lime.main" : "black",
                    }}>
                    <IconButton onClick={() => handleDeleteGroup(group._id)} sx={{ ml: 'auto' }}>
                        <CancelRoundedIcon color="darkgray" sx={{ '&:hover': { color: 'error.main' } }} />
                    </IconButton>
                </Box>
            </Stack>
        )
    })

    return (
        <Stack
            direction='column'
            spacing={2}
            sx={{
                maxHeight: "calc(100% - 78px)", overflowY: 'scroll'
            }}
        >
            {groupLinks}
        </Stack>
    )
};

export default GroupList;