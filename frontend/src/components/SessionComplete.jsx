import { Button, Box, Stack, Typography, LinearProgress, Rating } from '@mui/material'

import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';

const CompletedSession = ({ ongoingSession, handleArchive }) => {
    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                alignItems: 'center',
                borderRadius: 3,
                m: 3,
                p: 3,
                backgroundColor: "lightgray.main",
            }}>
                <Box sx={{ width: "30%" }}>
                    <LinearProgress
                        variant="determinate"
                        value={100}
                        color="success"
                        sx={{ backgroundColor: "lime.dark", mb: 1 }}
                    />
                </Box>
                <Typography gutterBottom variant="title2">
                    {ongoingSession.chosen.name}
                </Typography>
                <Stack direction="row" spacing={1}>
                    <Typography variant="body1" fontWeight={700}>
                        {ongoingSession.chosen.rating ? ongoingSession.chosen.rating : "-"}
                    </Typography>
                    <Typography variant="body1" fontWeight={700}>
                        ({ongoingSession.chosen.user_ratings_total ?? "-"})
                    </Typography>
                </Stack>
                <Rating
                    readOnly
                    precision={0.5}
                    value={ongoingSession.chosen.rating}
                    icon={<StarRoundedIcon fontSize="inherit" color="lime" />}
                    emptyIcon={<StarOutlineRoundedIcon fontSize="inherit" color="lime" />}
                    sx={{ p: 1, borderRadius: 5, backgroundColor: 'darkgray.main' }}
                />

                <Button
                    variant="contained"
                    onClick={handleArchive}
                    // sx={{ mt: 4 }}
                >
                    Archive
                </Button>
            </Box>

        </>
    )
}

export default CompletedSession;