import { Button, Box, Typography } from '@mui/material'

const CompletedSession = ({ ongoingSession, handleArchive }) => {
    return (
        <>
            <Box sx={{
                // width: '100%',
                // height: '100%',
                borderRadius: 3,
                m: 2,
                p: 5,
                backgroundColor: "lightgray.main"
            }}>
                <Typography gutterBottom variant="title2" component="div">
                    {ongoingSession.chosen.name}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="body3">
                        Rating: {ongoingSession.chosen.rating ? ongoingSession.chosen.rating + "⭐" : "-"}
                    </Typography>
                    <Typography variant="body3">
                        Reviews: {ongoingSession.chosen.user_ratings_total ?? "-"}
                    </Typography>
                    <Typography variant="body3">
                        Open now: {ongoingSession.chosen.is_open === null ? "-" : ongoingSession.chosen.is_open ? "Yes" : "No"}
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    onClick={handleArchive}
                    sx={{ mt: 4 }}
                >
                    Archive
                </Button>
            </Box>

        </>
    )
}

export default CompletedSession;