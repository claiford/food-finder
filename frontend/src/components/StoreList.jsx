import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";


const StoreList = ({ stores }) => {
    const navigate = useNavigate();

    const storeLinks = stores.map((store, i) => {
        return (
            <Button 
                key={i} 
                variant="contained"
                onClick={() => navigate(`/merchant/store/${store._id}`)}
            >
                {store.name}
            </Button>
        )
    })

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
        }}>
            {storeLinks}
        </Box>
    )
};

export default StoreList;