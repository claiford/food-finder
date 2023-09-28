import { useNavigate } from "react-router-dom";

import {
    Box,
    Stack,
    Typography,
    LinearProgress
} from "@mui/material";
import GroupWorkIcon from '@mui/icons-material/GroupWork';

const GroupList = ({ groups, inSession }) => {
    const navigate = useNavigate();

    const groupLinks = groups.map((group, i) => {
        const isInSession = inSession.some((g) => g._id === group._id);
        return (
            <Box
                key={i}
                onClick={() => navigate(`/customer/group/${group._id}`)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 3,
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