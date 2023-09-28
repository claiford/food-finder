import { DateTime } from "luxon";

import {
    Box,
    Typography
} from "@mui/material";

const SessionArchive = ({ archivedSessions }) => {
    archivedSessions.sort((a, b) => {
        // sort from newest to oldest
        return (DateTime.fromISO(a.createdAt) >= DateTime.fromISO(b.createdAt)) ? -1 : 1
    })
    const archiveCards = archivedSessions.map((archive, i) => {
        const sessionDate = DateTime.fromISO(archive.createdAt);
        return (
            <Box key={i} sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                backgroundColor: "white",
                p: 3,
            }}>
                <Typography variant="header3" sx={{ textAlign: 'center' }}>
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
                        {sessionDate.toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: 'numeric', minute: '2-digit' })}
                    </Typography>
                </Box>
            </Box>
        )
    });

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            m: 3,
        }}>
            {archiveCards}
        </Box>
    )
};

export default SessionArchive;