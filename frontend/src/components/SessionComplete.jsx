import { DateTime } from "luxon";

import { Button, Box, Stack, Typography, LinearProgress, Rating } from '@mui/material'

import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import LensIcon from '@mui/icons-material/Lens';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import RectangleRoundedIcon from '@mui/icons-material/RectangleRounded';

const CompletedSession = ({ ongoingSession, handleArchive }) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'center',
            borderRadius: 3,
            m: 3,
            p: 3,
            backgroundColor: "lightgray.main",
        }}>
            <Rating
                readOnly
                precision={1}
                value={ongoingSession.chosen.votes}
                max={ongoingSession.voters.length}
                icon={<Box sx={{ width: "10px", height: "4px", borderRadius: 2, mx: 0.25, backgroundColor: "success.main"}}></Box>}
                emptyIcon={<Box sx={{ width: "10px", height: "4px", borderRadius: 2, mx: 0.25, backgroundColor: "error.main"}}></Box>}
            />
            <Typography variant="header3" sx={{ textAlign: 'center' }}>
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

            <Box sx={{
                width: "100%",
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                mt: 2,
            }}>
                <Stack direction="column" sx={{ textAlign: 'left' }}>
                    <Typography variant="caption1">
                        {DateTime.fromISO(ongoingSession.createdAt).toLocaleString({ hour: 'numeric', minute: '2-digit' })}
                    </Typography>
                    <Typography variant="caption1" fontwei>
                        {DateTime.fromISO(ongoingSession.createdAt).toLocaleString({ weekday: 'short', month: 'short', day: '2-digit' })}
                    </Typography>
                </Stack>
                <Button
                    variant="contained"
                    onClick={handleArchive}
                >
                    Archive
                </Button>
            </Box>
        </Box>
    )
}

export default CompletedSession;