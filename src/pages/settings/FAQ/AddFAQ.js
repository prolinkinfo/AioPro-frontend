import React, { useState, useEffect } from 'react';
import { Button, Grid, MenuItem, Select, FormControl } from '@mui/material';
// import Editor from 'src/components/Editor'
import Editor from '../../../components/Editor';
import Questions from './Questions';
import { apiget } from '../../../service/api';

const FaqAdd = () => {
  const [pageTailorData, setPageTailorData] = useState({});
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [faqQuestions, setFaqQuestions] = useState([]);
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleOpenAdd = () => setIsOpenAdd(true);
  const handleCloseAdd = () => setIsOpenAdd(false);

  const updateEditorState = (val) => {
    console.log('val', val);
    pageTailorData[val?.id] = val?.data;
    setPageTailorData(pageTailorData);
  };

  const fetchTypeData = async () => {
    const result = await apiget(`/api/faqQuestion`);
    if (result && result.status === 200) {
      setFaqQuestions(result?.data);
    }
  };

  useEffect(() => {
    fetchTypeData();
  }, []);

  return (
    <div style={{ padding: '25px 100px' }}>
      <Questions isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} />
      <form>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }} sx={{ marginY: '20px' }}>
          <Grid item xs={8} sm={8} md={7}>
            <FormControl fullWidth>
              <Select value={age} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                <MenuItem value="">Select Questions</MenuItem>
                {faqQuestions?.map(({ question }, index) => (
                  <MenuItem key={index} value={question}>
                    {question}
                  </MenuItem>
                ))}
              </Select>
              {/* <FormHelperText>Without label</FormHelperText> */}
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={4} md={5}>
            <Button variant="outlined" onClick={handleOpenAdd}>
              Add Question
            </Button>
          </Grid>
        </Grid>
        <Editor Id="12112121112222" handleChangeMessage={updateEditorState} message={pageTailorData} />
      </form>
    </div>
  );
};

export default FaqAdd;
