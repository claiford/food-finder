import { useNavigate } from "react-router-dom";

import { Box, Avatar, Button, Typography } from "@mui/material";
import GroupWorkIcon from '@mui/icons-material/GroupWork';

const GroupList = ({ groups }) => {
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
                    p: 2,
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
            </Box>
        )
    })

    return (
        <Box sx={{
            maxHeight: '600px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            overflowY: 'scroll'
        }}>
            {groupLinks}
        </Box>
    )
};

export default GroupList;