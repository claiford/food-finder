import { Box, Typography } from "@mui/material";

const SessionArchive = ({ archivedSessions }) => {
    const archiveCards = archivedSessions.map((archive, i) => {
        return (
            <Box key={i} sx={{
                borderRadius: 3,
                backgroundColor: "lightgray",
                m: 2,
                p: 3,
            }}>
                <Typography variant="body2" component="div">
                    {archive.createdAt}
                </Typography>
            </Box>
        )
    });

    return (
        <>
            {archiveCards}
        </>
    )
};

export default SessionArchive;