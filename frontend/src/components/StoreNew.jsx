import { useContext, useState } from 'react';
import axios from 'axios';
import { usePlacesWidget } from "react-google-autocomplete";

import { AuthContext } from '../contexts/AuthContext';

import {
    Stack,
    TextField,
    Button
} from '@mui/material';


const StoreNew = ({ handleNewStore }) => {
    const [form, setForm] = useState({})
    const [formError, setFormError] = useState({})

    const { merchantInfo } = useContext(AuthContext);

    const handleInputChange = (e, key) => {
        if (key === "location") {
            setForm((prevForm) => {
                return {
                    ...prevForm,
                    location: null
                }
            });
            setFormError((prevFormError) => {
                return {
                    ...prevFormError,
                    location: "invalid"
                }
            });
        } else {
            setForm((prevForm) => {
                return {
                    ...prevForm,
                    [key]: e.target.value
                }
            });
            setFormError((prevFormError) => {
                return {
                    ...prevFormError,
                    [key]: ""
                }
            });
        }
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        if (form.location) {
            try {
                const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/merchant/api/stores/new`, { merchant: merchantInfo._id, place_id: form.location })
                e.target.reset();
                handleNewStore();
            } catch (err) {
                console.log(err);
            }
        }
    }

    const { ref: autocompleteRef } = usePlacesWidget({
        apiKey: "AIzaSyBLJXCbjB7HjCUmosPIocJkCpGjno-WJLg",
        options: {
            types: ['establishment'],
            componentRestrictions: { country: 'sg' },
        },
        onPlaceSelected: async (place) => {
            // const placeName = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/merchant/store/query`, {place_id: place.place_id})
            setForm((prevForm) => {
                return {
                    ...prevForm,
                    location: place.place_id,
                }
            });
            setFormError((prevFormError) => {
                return {
                    ...prevFormError,
                    location: ""
                }
            });
        },
    });

    return (
        <>
            <Stack direction='column' sx={{
                mx: 1,
            }}>
                <form onSubmit={handleSubmitForm}>
                    <TextField
                        sx={{ my: 2 }}
                        fullWidth
                        label="Store"
                        InputLabelProps={{ shrink: true }}
                        placeholder="Locate Your Store"
                        inputRef={autocompleteRef}
                        error={formError.location ? true : false}
                        helperText={formError.location ? "Please select a valid location." : ""}
                        onChange={(e) => handleInputChange(e, "location")}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Add Store
                    </Button>
                </form>
            </Stack>
        </>
    )
};

export default StoreNew;