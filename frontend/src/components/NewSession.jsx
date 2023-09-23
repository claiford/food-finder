import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, TextField, Button, IconButton, Modal, CircularProgress, Typography, MenuItem, FormControl } from '@mui/material';
import axios from 'axios';
import { usePlacesWidget } from "react-google-autocomplete";

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

const NewSession = () => {
    const [alertOpen, setAlertOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState({})
    const [form, setForm] = useState({
        location: null,
        distance: null,
        budget: null,
    })
    const [postResponse, setPostResponse] = useState({})
    const navigate = useNavigate();
    const { group_id } = useParams();

    const handleSuccessClose = () => {
        setAlertOpen(false);
        navigate("/customer/group/groupid")
    }

    const handleErrorClose = () => {
        setAlertOpen(false);
    }

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
                const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/customer/group/${group_id}/session/new`, form)
                setPostResponse({
                    status: res.status,
                    data: res.data
                })
                setAlertOpen(true);
                setLoading(false);
            } catch (err) {
                console.log("ERROR RES",)
                setPostResponse({
                    status: err.response.status
                })
                setAlertOpen(true);
                setLoading(false);
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
        options: {
            types: ['establishment'],
            componentRestrictions: { country: 'sg' },
        },
    });

    return (
        <>
            <Modal open={alertOpen} onClose={postResponse.status === 200 ? handleSuccessClose : handleErrorClose}>
                <Box sx={modalStyle}>
                    {postResponse.status === 200 &&
                        <>
                            <CheckCircleRoundedIcon color="success" />
                            <Typography variant='h6'>
                                New Session Generated
                            </Typography>
                            <IconButton onClick={handleSuccessClose} color="primary">
                                <ArrowBackRoundedIcon />
                            </IconButton>
                        </>
                    }
                    {postResponse.status === 500 &&
                        <>
                            <CancelRoundedIcon color="error" />
                            <Typography variant='h6'>
                                Server Error. Please Try Again.
                            </Typography>
                        </>
                    }
                </Box>
            </Modal>
            <h1>Create Session</h1>
            <form onSubmit={handleSubmitForm}>
                <FormControl>
                    <TextField
                        sx={{ my: 2 }}
                        inputRef={autocompleteRef}
                        label="Location"
                        disabled={loading}
                        error={formError.location ? true : false}
                        helperText={formError.location ? "Please select a valid location." : ""}
                        onChange={(e) => handleInputChange(e, "location")}
                    />
                    <TextField
                        select
                        sx={{ my: 2 }}
                        label="Distance"
                        defaultValue={""}
                        disabled={loading}
                        error={formError.distance ? true : false}
                        helperText={formError.distance ? "Please select an option." : ""}
                        onChange={(e) => handleInputChange(e, "distance")}
                    >
                        <MenuItem value={""} disabled></MenuItem>
                        <MenuItem value={1}>{"< 1km"}</MenuItem>
                        <MenuItem value={2}>{"< 2km"}</MenuItem>
                        <MenuItem value={3}>{"< 3km"}</MenuItem>
                    </TextField>
                    <TextField
                        select
                        sx={{ my: 2 }}
                        label="Budget"
                        defaultValue={""}
                        disabled={loading}
                        error={formError.budget ? true : false}
                        helperText={formError.budget ? "Please select an option." : ""}
                        onChange={(e) => handleInputChange(e, "budget")}
                    >
                        <MenuItem value={""} disabled></MenuItem>
                        <MenuItem value={4}>Any</MenuItem>
                        <MenuItem value={1}>$</MenuItem>
                        <MenuItem value={2}>$$</MenuItem>
                        <MenuItem value={3}>$$$</MenuItem>
                    </TextField>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        size="large"
                        disabled={loading}
                        sx={{ marginTop: "1rem", marginBottom: "2rem" }}
                    >
                        Create
                        {loading && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                }}
                            />
                        )}
                    </Button>
                </FormControl>
            </form>
        </>

    )
};

export default NewSession;