import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, ImageList, ImageListItem, TextField, Button, IconButton, Typography, Card, CardMedia, CardContent, CardActions } from '@mui/material';
import axios from 'axios';
import _ from 'lodash';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';

const images = require.context('../assets', true);

const Store = () => {
    const navigate = useNavigate();
    // ongoingSession
    // => incomplete : ongoing session in decision process
    // => complete   : ongoing session reached decision
    const [store, setStore] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [isAddPhoto, setIsAddPhoto] = useState(false);
    const [storeForm, setStoreForm] = useState({});

    /////////////////
    // PARAMS
    const { store_id } = useParams();
    /////////////////
    /////////////////


    /////////////////
    // HANDLERS
    const handleBack = () => {
        navigate("/merchant/home");
    }

    const handleEdit = () => {
        setIsEdit(true);
    }

    const handleEditCancel = () => {
        setIsEdit(false);
        setStoreForm(store);
    }

    const handleFormChange = (e) => {
        setStoreForm((prevStoreForm) => {
            return {
                ...prevStoreForm,
                [e.target.name]: e.target.value,
            }
        })
    };

    const handleToggleAddPhoto = () => {
        setIsAddPhoto((prev) => !prev);
    }

    const handleAddPhoto = (e) => {
        e.preventDefault()
        console.log("add photo");
        const newPhotos = [...storeForm.photos]
        newPhotos.push(e.target.newPhoto.value)
        setStoreForm((prevStoreForm) => {
            return {
                ...prevStoreForm,
                photos: newPhotos,
            }
        })
        setIsAddPhoto(false);
    };

    const handleDeletePhoto = (idx) => {
        console.log("delete photo");
        setStoreForm((prevStoreForm) => {
            return {
                ...prevStoreForm,
                photos: prevStoreForm.photos.toSpliced(idx, 1)
            }
        })
    };

    const handleEditSave = async () => {
        try {
            const storeInfo = {
                name: storeForm.name,
                promotion: storeForm.promotion,
                photos: storeForm.photos,
            }
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/merchant/store/${store_id}/edit`, { storeInfo: storeInfo });
            setIsEdit(false);
            getStore();
        } catch (err) {
            console.log(err)
        }
    }
    /////////////////
    /////////////////

    /////////////////
    // DATA RETRIEVAL
    const getStore = async () => {
        console.log("getting store")
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/merchant/store/${store_id}`);
            setStore(res.data);
            setStoreForm(res.data);
        } catch (err) {
            console.log(err);
        }
    }
    /////////////////
    /////////////////

    useEffect(() => {
        getStore()
    }, [])

    return (
        <Box className="store-page" sx={{ width: '400px', textAlign: 'left' }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <IconButton onClick={handleBack}>
                    <ArrowBackRoundedIcon color="lime" fontSize="large" />
                </IconButton>
                <Typography variant="title1">
                    Store
                    {/* {store.name} */}
                </Typography>
                {!isEdit ? (
                    <IconButton onClick={handleEdit}>
                        <EditRoundedIcon color="lime" fontSize="large" />
                    </IconButton>
                ) : (
                    <IconButton onClick={handleEditCancel}>
                        <CloseRoundedIcon color="lime" fontSize="large" />
                    </IconButton>
                )}
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                mt: 2,
                mx: 3,
            }}>
                <Typography variant="header2">
                    Name
                </Typography>
                {!isEdit ? (
                    <Typography variant="body1"
                        sx={{
                            backgroundColor: 'white',
                            color: "black",
                            borderRadius: 1,
                            py: 2,
                            px: 1.75,
                            boxSizing: 'border-box'
                        }}
                    >
                        {store.name}
                    </Typography>
                ) : (
                    <TextField
                        value={storeForm.name}
                        name="name"
                        onChange={handleFormChange}
                    >
                    </TextField>
                )}

                <Typography variant="header2">
                    Promotion
                </Typography>
                {!isEdit ? (
                    <Typography variant="body1"
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: 1,
                            py: 2,
                            px: 1.75,
                            boxSizing: 'border-box'
                        }}
                    >
                        {store.promotion}
                    </Typography>
                ) : (
                    <TextField
                        value={storeForm.promotion}
                        name="promotion"
                        onChange={handleFormChange}
                    >
                    </TextField>
                )}

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Typography variant="header2">
                        Photos
                    </Typography>
                    {isEdit &&
                        <IconButton sx={{ p: 0 }} onClick={handleToggleAddPhoto}>
                            <AddRoundedIcon color="lime" />
                        </IconButton>
                    }
                </Box>
                {isAddPhoto &&
                    <form onSubmit={handleAddPhoto}>
                        <Box sx={{
                            display: 'flex',
                            gap: 1,
                            alignItems: 'center',
                        }}>
                            <TextField
                                fullWidth
                                label="Photo URL"
                                name="newPhoto"
                            >
                            </TextField>
                            <IconButton type="submit">
                                <DoneRoundedIcon color="lime" fontSize='small' />
                            </IconButton>
                        </Box>
                    </form>
                }
                {!isEdit ? (
                    <>
                        {store.photos?.length > 0 ? (
                            <Box className="masonry" sx={{ height: 400, overflowY: 'scroll', mt: -2 }}>
                                <ImageList variant="masonry" cols={2} gap={8}>
                                    {store.photos.map((photoURL, i) => (
                                        <ImageListItem key={i}>
                                            <img
                                                src={images(`${photoURL}`)}
                                                // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                                alt={`${store.name}-${i}`}
                                                loading="lazy"
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            </Box>
                        ) : (
                            <Box sx={{
                                height: 400,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: "lightgray",
                                borderRadius: 5,
                            }}>
                                <Typography variant="h6">
                                    no photos yet
                                </Typography>
                                {/* <img src={cryface} alt="none found" width='50%' /> */}
                            </Box>
                        )}
                    </>
                ) : (
                    <ImageList sx={{ height: 400, mt: 0 }} cols={1} gap={15}>
                        {storeForm.photos.map((photoURL, idx) => {
                            return (
                                <ImageListItem key={idx}>
                                    <Card sx={{ display: 'flex', backgroundColor: "black" }}>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: '80%' }}
                                            image={images(`${photoURL}`)}
                                            alt={`${storeForm.name}-${idx}`}
                                        />
                                        <Box
                                            sx={{
                                                width: "20%",
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                my: 1,
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                fontWeight={700}
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    width: "25px",
                                                    height: "25px",
                                                    borderRadius: 1.5,
                                                    backgroundColor: "darkgray.main",
                                                    m: 1,
                                                }}
                                            >
                                                {idx + 1}
                                            </Typography>
                                            <IconButton onClick={() => handleDeletePhoto(idx)}>
                                                <DeleteForeverRoundedIcon color='darkgray' fontSize='large' />
                                            </IconButton>
                                        </Box>
                                    </Card>
                                </ImageListItem>
                            )
                        })}
                    </ImageList>
                )}

                {isEdit &&
                    <Button
                        variant="contained"
                        disabled={_.isEqual(store, storeForm)}
                        onClick={handleEditSave}
                    >
                        Save Changes
                    </Button>
                }
            </Box>
        </Box>
    )
};

export default Store;
