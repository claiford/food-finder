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
                backgroundColor: "white",
                m: 3,
                p: 3,
            }}>
                <Typography variant="title2">
                    {archive.chosen.name}
                </Typography>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 2,
                }}>
                    <Typography variant="body3">
                        {archive.chosen.votes} 👍
                    </Typography>
                    <Typography variant="body3">
                        {sessionDate.toLocaleString(DateTime.DATETIME_SHORT)}
                    </Typography>
                </Box>
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