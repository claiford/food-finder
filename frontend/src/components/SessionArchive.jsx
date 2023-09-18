import { DateTime } from "luxon";
import { Box, Typography } from "@mui/material";

const SessionArchive = ({ archivedSessions }) => {
    archivedSessions.sort((a, b) => {
        // sort from newest to oldest
        return (DateTime.fromISO(a.createdAt) >= DateTime.fromISO(b.createdAt)) ? -1 : 1
    })
    const archiveCards = archivedSessions.map((archive, i) => {
        const sessionDate = DateTime.fromISO(archive.createdAt);
        return (
            <Box key={i} sx={{
                borderRadius: 3,
                backgroundColor: "lightgray",
                m: 2,
                p: 3,
            }}>
                <Typography variant="body2" component="div">
                    {archive.chosen.name}
                </Typography>
                <Typography variant="body2" component="div">
                    {archive.chosen.votes} 👍
                </Typography>
                <Typography variant="body2" component="div">
                    {sessionDate.toLocaleString(DateTime.DATETIME_SHORT)}
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