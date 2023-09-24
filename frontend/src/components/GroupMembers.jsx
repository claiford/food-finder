import { Avatar, Box, Typography } from "@mui/material";

const GroupMembers = ({ members }) => {
    const memberList = members.map((member, i) => {
        const nameparts = member.name.split(" ");
        const initialA =nameparts[0][0].toUpperCase();
        const initialB = (nameparts.length > 1) ? nameparts[1][0].toUpperCase() : "";

        return (
            <Box key={i} sx={{
                display: 'flex',
                // justifyContent: 'center',
                alignItems: 'center',
                m: 2,
            }}>
                <Avatar sx={{mx: 2}}>
                    {initialA}{initialB}
                </Avatar>
                <Typography>
                    {member.name}
                </Typography>
            </Box>
        )
    })

    return (
        <>
            {memberList}
        </>
    )
};

export default GroupMembers;