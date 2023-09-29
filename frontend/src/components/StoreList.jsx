import { useNavigate } from "react-router-dom";

import {
    Box,
    Stack,
    IconButton,
    Typography
} from "@mui/material";
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

const StoreList = ({ stores, handleDeleteStore }) => {
    const navigate = useNavigate();

    const storeLinks = stores.map((store, i) => {
        return (
            <Stack key={i} direction={"row"} spacing={0}>
                <Box
                    onClick={() => navigate(`/merchant/store/${store._id}`)}
                    sx={{
                        width: "90%",
                        display: 'flex',
                        alignItems: 'center',
                        borderTopLeftRadius: "12px",
                        borderBottomLeftRadius: "12px",
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
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    pr: 2,
                    borderTopRightRadius: "12px",
                    borderBottomRightRadius: "12px",
                    backgroundColor: "black",
                }}>
                    <IconButton onClick={() => handleDeleteStore(store._id)} sx={{ ml: 'auto' }}>
                        <CancelRoundedIcon color="darkgray" sx={{ '&:hover': { color: 'error.main' } }} />
                    </IconButton>
                </Box>
            </Stack>
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