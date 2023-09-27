import { useEffect, useState } from "react";
import axios from 'axios';
import {
    Box,
    TextField,
    Typography,
    Stack,
    Badge,
    Avatar,
    IconButton,
} from "@mui/material";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

import FetchUsers from "./FetchUsers";

const CustomerSelect = ({ selectedMembers, handleAddSelected, handleRemoveSelected }) => {
    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchInput, setSearchInput] = useState("");

    const getCustomers = async () => {
        try {
            // Make a GET request to your backend API endpoint
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/customer/api/customers`);
            setCustomers(response.data)
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error fetching user data:', error);
            return null;
        }
    }

    const selectedCustomers = selectedMembers.map((customer, idx) => (
        <Box key={idx} sx={{ maxHeight: '45px' }}>
            <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                    <IconButton sx={{ ml: 1.5 }} onClick={() => handleRemoveSelected(idx)}>
                        <CancelRoundedIcon color="lightgray" />
                    </IconButton>
                }
            >
                <Avatar sx={{
                    backgroundColor: "black",
                }}>
                    <Typography variant="body4" fontWeight={700}>
                        {customer.name.split(" ")[0][0].toUpperCase()}
                        {(customer.name.split(" ").length > 1) ? customer.name.split(" ")[1][0].toUpperCase() : ""}
                    </Typography>
                </Avatar>
            </Badge>
        </Box>
    ))

    // Filter: not current user, not already added members, and based on search input
    const filteredCustomers = customers
        .filter((customer) =>
            customer._id !== localStorage.getItem("customerToken") &&
            !selectedMembers.includes(customer) &&
            customer.name.toLowerCase().includes(searchInput.toLowerCase()))
        .map((customer, idx) => (
            <Box
                key={idx}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    gap: 2,
                    '&:hover': {
                        cursor: 'pointer',
                    }
                }}
            >
                <Avatar sx={{
                    backgroundColor: "black",
                }}>
                    <Typography variant="body4" fontWeight={700}>
                        {customer.name.split(" ")[0][0].toUpperCase()}
                        {(customer.name.split(" ").length > 1) ? customer.name.split(" ")[1][0].toUpperCase() : ""}
                    </Typography>
                </Avatar>
                <Typography variant="body2" fontWeight={700}>
                    {customer.name}
                </Typography>
                <IconButton onClick={() => handleAddSelected(customer)} sx={{ ml: "auto" }}>
                    <AddCircleRoundedIcon color="lime" />
                </IconButton>
            </Box>
        ))

    // const filteredCustomers = 

    useEffect(() => {
        getCustomers()
    }, []);

    return (
        <>
            <Stack direction="row" spacing={2} sx={{ mt: 3, minHeight: '60px', overflowX: 'scroll' }}>
                {selectedCustomers}
            </Stack>

            <TextField
                label="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                fullWidth
                margin="normal"
            />

            <Box sx={{
                height: "400px",
                overflowY: 'scroll'
            }}>
                <Stack direction="column" spacing={0}>
                    {filteredCustomers}
                </Stack>
            </Box>
        </>
    )
};

export default CustomerSelect;