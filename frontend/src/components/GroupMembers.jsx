import { Button, Avatar, Box, Typography } from "@mui/material";

const GroupMembers = ({ members }) => {
    const memberList = members.map((member, i) => {
        const nameparts = member.name.split(" ");
        const initialA = nameparts[0][0].toUpperCase();
        const initialB = (nameparts.length > 1) ? nameparts[1][0].toUpperCase() : "";

        return (
            <Box key={i} sx={{
                display: 'flex',
                alignItems: 'center',
                m: 2,
            }}>
                <Avatar sx={{
                    mx: 2,
                    backgroundColor: "black",
                    color: "lime.main",
                }}>
                    <Typography variant="body4" fontWeight={700}>
                        {initialA}{initialB}
                    </Typography>
                </Avatar>
                <Typography
                    variant="body2"
                    fontWeight={700}
                >
                    {member.name}
                </Typography>
            </Box>
        )
    })

    return (
        <>
            {memberList}
            <br/>
            <Button variant="contained" color="primary">
        Edit Members
      </Button>
        </>
    )
};

export default GroupMembers;