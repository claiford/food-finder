import { useNavigate } from "react-router-dom";

import { Box, Stack, Avatar, Button, Typography, LinearProgress } from "@mui/material";
import GroupWorkIcon from '@mui/icons-material/GroupWork';

const GroupList = ({ groups, inSession }) => {
    const navigate = useNavigate();

    const groupLinks = groups.map((group, i) => {
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
                    backgroundColor: "black",
                    '&:hover': {
                        cursor: 'pointer',
                    }
                }}
            >
                <GroupWorkIcon color="lime" />
                <Typography variant="body2" fontWeight={700}>
                    {group.name}
                </Typography>
                {inSession.some((g) => g._id === group._id) &&
                    <Box sx={{ width: "10%", ml: 'auto' }}>
                        <LinearProgress color="lime" sx={{ backgroundColor: "darkgray.main" }} />
                    </Box>
                }
            </Box>
        )
    })

    return (
        <Stack direction='column' spacing={2} sx={{ maxHeight: "calc(100% - 78px)", overflowY: 'scroll'}}>
            {groupLinks}
        </Stack>
    )
};

export default GroupList;