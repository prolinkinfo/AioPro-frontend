/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable prefer-const */
import * as React from 'react';
import { useEffect, useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import { FormLabel, Dialog, Button, Autocomplete, FormControl } from '@mui/material';
import { useParams } from 'react-router-dom';
import img from '../../../assets/images/Folder-icon.png'
import { apiget, apiput } from '../../../service/api';

const AddSlide = (props) => {
    // eslint-disable-next-line react/prop-types
    const { isOpen, handleClose, data, fetchData } = props;
    const [mediaList, setMediaList] = useState([])
    const [selectedImages, setSelectedImages] = useState([]);
    const { id } = useParams();

    const handleImageSelect = (selectedImage) => {
        const isSelected = selectedImages.some((img) => img._id === selectedImage._id);

        if (isSelected) {
            // Image is already selected, remove it from the selectedImages array
            setSelectedImages((prevSelected) => prevSelected.filter((img) => img._id !== selectedImage._id));
        } else {
            // Image is not selected, add it to the selectedImages array
            setSelectedImages((prevSelected) => [...prevSelected, { _id: selectedImage._id, image: selectedImage.image }]);
        }
    };

    const fetchMediaData = async () => {
        const result = await apiget(`/api/mediaGallery`);
        if (result && result.status === 200) {
            setMediaList(result?.data?.result);
        }
    };

    const addPresentation = async () => {
        const payload = {
            _id: id,
            slideImgs: selectedImages
        }
        const result = await apiput('/api/presentation/addSlide', payload);
        if (result && result.status === 200) {
            fetchData();
            handleClose();
        }
    };

    useEffect(() => {
        fetchMediaData();
        if (data?.slideImgs) setSelectedImages(data?.slideImgs)
    }, [data])


    return (
        <div>
            <Dialog open={isOpen} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
                <DialogTitle
                    id="scroll-dialog-title"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="h6">Assiged Media Presentation </Typography>
                    <Typography>
                        <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                            {mediaList?.map((img, index) => (
                                <Grid item xs={12} sm={3} md={3} key={index}>
                                    <div style={{ padding: '10px', position: 'relative', cursor: 'pointer' }}>
                                        <input
                                            type="checkbox"
                                            id={`selectedImage-${index}`}
                                            checked={selectedImages.some((selectedImg) => selectedImg._id === img._id)}
                                            onChange={() => handleImageSelect(img)}
                                            style={{
                                                position: 'absolute',
                                                opacity: '0',
                                                width: '100px',
                                                height: '100px',
                                                left: '0',
                                                cursor: 'pointer',
                                            }}
                                        />
                                        <label htmlFor={`selectedImage-${index}`}>
                                            <img
                                                src={img?.image}
                                                alt={img?.name}
                                                style={{
                                                    width: '300px',
                                                    height: 'auto',
                                                    marginRight: '12px',
                                                    padding: '5px',
                                                    cursor: 'pointer',
                                                    border: selectedImages.some((selectedImg) => selectedImg._id === img._id)
                                                        ? '1px solid blue'
                                                        : '',
                                                }}
                                            />
                                        </label>
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        type="submit"
                        variant="contained"
                        style={{ textTransform: 'capitalize' }}
                        onClick={addPresentation}
                    >
                        Save
                    </Button>
                    <Button
                        type="reset"
                        variant="outlined"
                        color="error"
                        style={{ textTransform: 'capitalize' }}
                        onClick={() => {
                            handleClose();
                        }}
                    >
                        Cancle
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddSlide;
