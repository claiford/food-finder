import { useNavigate } from "react-router-dom";

import { Box, Avatar, Button, Typography } from "@mui/material";
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
                    p: 2,
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
            // <Button 
            //     key={i} 
            //     variant="contained"
            //     onClick={() => navigate(`/merchant/store/${store._id}`)}
            // >
            //     {store.name}
            // </Button>
        )
    })

    return (
        <Box sx={{
            maxHeight: '600px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            overflowY: 'scroll'
        }}>
            {storeLinks}
        </Box>
    )
};

export default StoreList;