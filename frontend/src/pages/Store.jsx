import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

import {
    Box,
    ImageList,
    ImageListItem,
    TextField,
    Button,
    IconButton,
    Typography,
    Card,
    CardMedia,
    Stack
} from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const images = require.context('../assets', true);

const Store = () => {
    const navigate = useNavigate();
    // ongoingSession
    // => incomplete : ongoing session in decision process
    // => complete   : ongoing session reached decision
    const [store, setStore] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [storeForm, setStoreForm] = useState({});

    /////////////////
    // PARAMS
    const { store_id } = useParams();
    /////////////////
    /////////////////

    /////////////////
    // HANDLERS
    const handlePageBack = () => {
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

    const handleAddPhoto = (e) => {
        e.preventDefault()
        const newPhotos = [...storeForm.photos]
        newPhotos.push(e.target.newPhoto.value)
        setStoreForm((prevStoreForm) => {
            return {
                ...prevStoreForm,
                photos: newPhotos,
            }
        })
        e.target.reset();
    };

    const handleDeletePhoto = (idx) => {
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
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/merchant/api/store/${store_id}/edit`, { storeInfo: storeInfo });
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
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/merchant/api/store/${store_id}`);
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
        <Box className="group-page" sx={{
            width: "90%",
            maxWidth: '350px',
            height: "100%",
            maxHeight: '800px',
        }}>

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <IconButton onClick={handlePageBack}>
                    <ArrowBackRoundedIcon color="lime" fontSize="large" />
                </IconButton>
                <Typography
                    variant="title1"
                    component="div"
                    sx={{
                        m: 3,
                        textAlign: 'center'
                    }}
                >
                    Store
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
                {/* NAME */}
                <Stack spacing={1}>
                    <Typography variant="header2" sx={{ pl: 1 }}>
                        Name
                    </Typography>
                    {!isEdit ? (
                        <Typography variant="body4" fontWeight={700}
                            sx={{
                                backgroundColor: 'black',
                                borderRadius: 3,
                                py: 2.3,
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
                </Stack>

                {/* PROMOTION */}
                <Stack spacing={1}>
                    <Typography variant="header2" sx={{ pl: 1 }}>
                        Promotion
                    </Typography>
                    {!isEdit ? (
                        <Typography variant="body4" fontWeight={700}
                            sx={{
                                backgroundColor: 'black',
                                borderRadius: 3,
                                py: 2.3,
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
                </Stack>

                {/* PHOTOS */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    minHeight: '40px',
                }}>
                    <Typography variant="header2" sx={{ pl: 1, mr: 3 }}>
                        Photos
                    </Typography>
                    {isEdit &&
                        <form onSubmit={handleAddPhoto}>
                            <Box sx={{
                                width: "100%",
                                display: 'flex',
                                gap: 1,
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                            }}>
                                <TextField
                                    size="small"
                                    label="New Photo (url)"
                                    name="newPhoto"
                                >
                                </TextField>
                                <IconButton type="submit" sx={{ p: 0 }}>
                                    <AddRoundedIcon color="lime" />
                                </IconButton>
                            </Box>
                        </form>
                    }
                </Box>
                {!isEdit ? (
                    <>
                        {store.photos?.length > 0 ? (
                            <Box className="masonry" sx={{ height: 300, overflowY: 'scroll', mt: -2 }}>
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
                                height: 300,
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
                    <ImageList sx={{ height: 300, mt: 0 }} cols={1} gap={15}>
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
