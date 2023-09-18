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
                backgroundColor: "gray"
            }}>
                <Typography gutterBottom variant="h5" component="div">
                    {ongoingSession.candidates[1].name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Rating: {ongoingSession.candidates[1].rating ? ongoingSession.candidates[1].rating + "⭐" : "-"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Reviews: {ongoingSession.candidates[1].user_ratings_total ?? "-"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Open now: {ongoingSession.candidates[1].is_open === null ? "-" : ongoingSession.candidates[1].is_open ? "Yes" : "No"}
                </Typography>
                <Button variant="contained" onClick={handleArchive} sx={{ mt: 4 }}>
                    Archive
                </Button>
            </Box>

        </>
    )
}

export default CompletedSession;