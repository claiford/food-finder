import { useNavigate } from "react-router-dom";

import { Box, Stack, Typography } from "@mui/material";
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';

const StoreList = ({ stores }) => {
    const navigate = useNavigate();

    const storeLinks = stores.map((store, i) => {
        return (
            <Box
                key={i}
                onClick={() => navigate(`/merchant/store/${store._id}`)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 3,
                    py: 2,
                    px: 3,
                    gap: 2,
                    backgroundColor: "black",
                    '&:hover': {
                        cursor: 'pointer',
                    }
                }}
            >
                <StoreRoundedIcon color="lime" />
                <Typography variant="body2" fontWeight={700}>
                    {store.name}
                </Typography>
            </Box>
        )
    })

    return (
        <Stack
            direction='column'
            spacing={2}
            sx={{
                maxHeight: "calc(100% - 78px)", overflowY: 'scroll'
            }}
        >
            {storeLinks}
        </Stack>
    )
};

export default StoreList;