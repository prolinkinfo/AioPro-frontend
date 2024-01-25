import React, { useState, useEffect } from 'react';
import { Button, Grid, MenuItem, Select, FormControl, FormLabel, Autocomplete, TextField, Container, Stack, Typography, Card } from '@mui/material';
// import Editor from 'src/components/Editor'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Iconify from '../../../components/iconify';
import Editor from '../../../components/Editor';
import Questions from './Questions';
import { apipost, apiput } from '../../../service/api';
import { fetchFaqQuestion } from '../../../redux/slice/GetFaqQuestionSlice';

const FaqAdd = () => {
  const [pageTailorData, setPageTailorData] = useState({});
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const location = useLocation();
  const { data } = location.state || {};
  const [question, setQuestion] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const faqQuestionList = useSelector((state) => state?.getFaqQuestion?.data)

  const handleOpenAdd = () => setIsOpenAdd(true);
  const handleCloseAdd = () => setIsOpenAdd(false);

  const updateEditorState = (val) => {
    setPageTailorData(val);
  };

  const handleSubmit = async () => {
    const payloadA = {
      question,
      answer: pageTailorData,
    }
    const payloadB = {
      _id: data?._id,
      question,
      answer: pageTailorData,
    }
    if (data?._id) {
      await apiput('/api/faqMaster', payloadB);
    } else {
      await apipost('/api/faqMaster', payloadA);
    }
    navigate(-1);
  }

  useEffect(() => {
    dispatch(fetchFaqQuestion());
  }, []);

  useEffect(() => {
    if (data) {
      setQuestion(data?.question);
      setPageTailorData(data?.answer);
    }
  }, [data]);

  return (
    <>
      <Questions isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchFaqQuestion={fetchFaqQuestion} />
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
          <Typography variant="h4">FAQ Bank</Typography>
          <Button variant="contained" startIcon={<Iconify icon="material-symbols:arrow-back-ios" />} onClick={() => navigate(-1)}>
            Back
          </Button>
        </Stack>
        <form>
          <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }} sx={{ marginY: '20px' }}>
            <Grid item xs={8} sm={8} md={7}>
              <Autocomplete
                size="small"
                onChange={(event, newValue) => {
                  setQuestion(newValue ? newValue?.question : "");
                }}
                fullWidth
                options={faqQuestionList}
                value={faqQuestionList.find(faqQuestion => faqQuestion?.question === question) || null}
                getOptionLabel={(faqQuestion) => faqQuestion?.question}
                style={{ textTransform: 'capitalize' }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    style={{ textTransform: 'capitalize' }}
                    placeholder='Select Question'
                  />
                )}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={5}>
              <Button variant="outlined" onClick={handleOpenAdd}>
                Add Question
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <FormLabel>Answer</FormLabel>
              <Editor handleChangeMessage={updateEditorState} message={pageTailorData} />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Button variant='contained' onClick={handleSubmit}>Save</Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default FaqAdd;
