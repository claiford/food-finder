import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, TextField, Button, IconButton, CircularProgress, MenuItem, Alert } from '@mui/material';
import axios from 'axios';
import { usePlacesWidget } from "react-google-autocomplete";

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const SessionNew = ({ refreshData }) => {
    const [loading, setLoading] = useState(false);
    const [formDisabled, setFormDisabled] = useState(false);
    const [formError, setFormError] = useState({})
    const [form, setForm] = useState({
        location: null,
        distance: null,
        budget: null,
    })
    const [postResponse, setPostResponse] = useState({})
    const { group_id } = useParams();

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
        if (form.location && form.distance && form.budget) {
            try {
                setLoading(true);
                setFormDisabled(true);
                const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/customer/group/${group_id}/session/new`, form)
                setPostResponse({
                    status: res.status,
                    data: res.data
                })
                setLoading(false);
            } catch (err) {
                setPostResponse({
                    status: err.response.status
                })
                setLoading(false);
                setFormDisabled(false);
            }
        } else {
            for (const field of Object.keys(form)) {
                if (form[field] === null) {
                    setFormError((prevFormError) => {
                        return {
                            ...prevFormError,
                            [field]: "invalid"
                        }
                    });
                }
            }
        }
    }

    const { ref: autocompleteRef } = usePlacesWidget({
        apiKey: "AIzaSyBLJXCbjB7HjCUmosPIocJkCpGjno-WJLg",
        options: {
            types: ['establishment'],
            componentRestrictions: { country: 'sg' },
        },
        onPlaceSelected: (place) => {
            setForm((prevForm) => {
                return {
                    ...prevForm,
                    location: place.place_id
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
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                alignItems: 'center',
                borderRadius: 3,
                m: 3,
            }}>
                <form onSubmit={handleSubmitForm}>
                    <TextField
                        sx={{ mt: 2 }}
                        fullWidth
                        placeholder=""
                        inputRef={autocompleteRef}
                        label="Location"
                        disabled={formDisabled}
                        error={formError.location ? true : false}
                        helperText={formError.location ? "Please select a valid location." : ""}
                        onChange={(e) => handleInputChange(e, "location")}
                    />
                    <TextField
                        select
                        sx={{ my: 2 }}
                        fullWidth
                        label="Distance"
                        defaultValue={""}
                        disabled={formDisabled}
                        error={formError.distance ? true : false}
                        helperText={formError.distance ? "Please select an option." : ""}
                        onChange={(e) => handleInputChange(e, "distance")}
                    >
                        <MenuItem value={""} sx={{ display: 'none' }}></MenuItem>
                        <MenuItem sx={{ color: "black" }} value={1}>{"< 1km"}</MenuItem>
                        <MenuItem sx={{ color: "black" }} value={2}>{"< 2km"}</MenuItem>
                        <MenuItem sx={{ color: "black" }} value={3}>{"< 3km"}</MenuItem>
                    </TextField>
                    <TextField
                        select
                        sx={{ mb: 2 }}
                        fullWidth
                        label="Budget"
                        defaultValue={""}
                        disabled={formDisabled}
                        error={formError.budget ? true : false}
                        helperText={formError.budget ? "Please select an option." : ""}
                        onChange={(e) => handleInputChange(e, "budget")}
                    >
                        <MenuItem value={""} sx={{ display: 'none' }}></MenuItem>
                        <MenuItem sx={{ color: "black" }} value={4}>Any</MenuItem>
                        <MenuItem sx={{ color: "black" }} value={1}>$</MenuItem>
                        <MenuItem sx={{ color: "black" }} value={2}>$$</MenuItem>
                        <MenuItem sx={{ color: "black" }} value={3}>$$$</MenuItem>
                    </TextField>
                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        disabled={formDisabled}
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
                </form>
                {postResponse.status === 200 &&
                    <>
                        <Alert severity="success" sx={{ mt: 3 }}>New session generated</Alert>
                        <IconButton onClick={refreshData} color="primary">
                            <ArrowBackRoundedIcon />
                        </IconButton>
                    </>
                }
                {postResponse.status === 500 &&
                    <Alert severity="error" sx={{ mt: 3 }}>Server error, please try again.</Alert>
                }
            </Box>
        </>
    )
};

export default SessionNew;