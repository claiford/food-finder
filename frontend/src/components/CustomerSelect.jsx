import { useEffect, useState } from "react";
import axios from 'axios';
import _ from 'lodash';

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

const CustomerSelect = ({ existingMembers, selectedMembers, handleAddSelected, handleRemoveSelected }) => {
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

    const nameToInitials = (fullName) => {
        const nameparts = fullName.split(" ");
        const initialA = nameparts[0][0].toUpperCase();
        const initialB = nameparts.length > 1 ? nameparts[1][0].toUpperCase() : "";
        return [initialA, initialB]
    }

    const selectedCustomers = selectedMembers.map((customer, idx) => {
        const [initialA, initialB] = nameToInitials(customer.name);
        return (
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
        )
    })

    // Filter: not current user, not existing members, not already selected members, and based on search input
    const filteredCustomers = customers
        .filter((customer) =>
            customer._id !== localStorage.getItem("customerToken") &&
            !existingMembers.some((existing) => _.isEqual(existing, customer)) &&
            !selectedMembers.some((selected) => _.isEqual(selected, customer)) &&
            customer.name.toLowerCase().includes(searchInput.toLowerCase()))
        .map((customer, idx) => {
            const [initialA, initialB] = nameToInitials(customer.name);
            return (
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
                            {initialA}{initialB}
                        </Typography>
                    </Avatar>
                    <Typography variant="body2" fontWeight={700}>
                        {customer.name}
                    </Typography>
                    <IconButton onClick={() => handleAddSelected(customer)} sx={{ ml: "auto" }}>
                        <AddCircleRoundedIcon color="lime" />
                    </IconButton>
                </Box>
            )
        })

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
            />

            <Stack direction="column" spacing={0} sx={{
                height: "300px",
                my: 2,
                overflowY: 'scroll',
            }}>
                {filteredCustomers}
            </Stack>
        </>
    )
};

export default CustomerSelect;