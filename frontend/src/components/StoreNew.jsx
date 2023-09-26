import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, TextField, Button, CircularProgress, MenuItem, Alert } from '@mui/material';
import axios from 'axios';
import { usePlacesWidget } from "react-google-autocomplete";

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const StoreNew = ({ handleForm }) => {
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState({})
    const [form, setForm] = useState({})
    const [postResponse, setPostResponse] = useState({})
    const navigate = useNavigate();

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
                setLoading(true);
                const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/merchant/store/new`, {place_id: form.location})
                setPostResponse({
                    status: res.status,
                    data: res.data
                })
                setLoading(false);
                e.target.reset();
                handleForm();
            } catch (err) {
                setPostResponse({
                    status: err.response.status
                })
                setLoading(false);
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
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <form onSubmit={handleSubmitForm}>
                    <Box sx={{mx: 3}}>
                        <TextField
                            sx={{ my: 2 }}
                            fullWidth
                            placeholder=""
                            inputRef={autocompleteRef}
                            label="Store"
                            disabled={loading}
                            error={formError.location ? true : false}
                            helperText={formError.location ? "Please select a valid location." : ""}
                            onChange={(e) => handleInputChange(e, "location")}
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            disabled={loading}
                        >
                            Create
                            {loading && (
                                <CircularProgress
                                    color="lime"
                                    size={24}
                                    sx={{
                                        position: 'absolute',
                                    }}
                                />
                            )}
                        </Button>
                    </Box>
                </form>
                {/* {postResponse.status === 200 &&
                    <>
                        <Alert severity="success" sx={{mt: 4}}>New session generated</Alert>
                        <IconButton onClick={handleNew} color="primary">
                            <ArrowBackRoundedIcon />
                        </IconButton>
                    </>
                }
                {postResponse.status === 500 &&
                    <>
                        <Alert severity="error" sx={{mt: 4}}>Server error, please try again.</Alert>
                    </>
                } */}
            </Box>
        </>
    )
};

export default StoreNew;