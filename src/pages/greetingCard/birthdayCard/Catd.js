import { Button, Grid, Stack } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useEffect, useState } from 'react';
import ShareIcon from '@mui/icons-material/Share';
import { apiget } from '../../../service/api';

import './style.css';
import Share from '../Share';
// import Header from '../../../components/Header';
// import Card1 from './images/card1.png';

const BirthdayCards = () => {
  const [card, setCard] = useState({});
  const [sharcard, setShareCard] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  
  const cardData = async () => {
    const result = await apiget(`/api/greetingCard/${params.id}`);
    if (result && result.status === 200) {
      setCard(result?.data);
    }
  };

  useEffect(() => {
    cardData();
  }, []);

  const back = () => {
    navigate('/dashboard/greetingcard');
  };


  console.log("location",location?.pathname);

  console.log("card",card);
  const msg ='Happy birthday!! I hope your day is filled with lots of love and laughter! May all of your birthday wishes come true';
  return (
    <div style={{ height: '80vh', padding: '10px 30px' }}>
      <Share open={sharcard} handleClose={setShareCard}/>
      <Grid container display="flex" alignItems="center">
        <Stack direction="row" alignItems="center" px={1} mb={3} justifyContent={'space-between'} width={'100%'}>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" color="secondary" startIcon={<ArrowBackIosIcon />} onClick={back}>
              Back
            </Button>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" color="secondary" startIcon={<ShareIcon />} onClick={()=>setShareCard(true)}>
              Share
            </Button>
          </Stack>
        </Stack>
      </Grid>
      <div className="body">
        <div className="birthdayCard">
          <div className="cardFront">
            <div className="front-text">
              <h3 className="happy">HAPPY</h3>
              <h2 className="bday">BIRTHDAY</h2>
              <h3 className="toyou">to you!</h3>
            </div>
            <div className="wrap-deco">
              <div className="decorations" />
              <div className="decorationsTwo" />
            </div>
            <div className="wrap-decoTwo">
              <div className="decorations" />
              <div className="decorationsThree" />
            </div>
            <div className="plate">
              <div className="cake" />
              <div className="flame" />
            </div>
          </div>

          <div className="cardInside">
            <div style={{ display: 'flex' }}>
              <img
                src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'
                style={{
                  width: 'auto',
                  height: '100px',
                  marginRight: '12px',
                  padding: '5px',
                  borderRadius:"50%"
                }}
                alt="user img"
              />
              <div>
                <h4 style={{ padding: '0px' }}>Happy</h4>
                <h3 style={{ padding: '0px' }}>Birthday</h3>
                <h4 style={{ padding: '0px' }}>to you!</h4>
              </div>
            </div>
            <div className="wishes">
              <p>Dear {card?.name},</p>
              <p>{msg}</p>
              {/* <p className="name">jaysukh</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BirthdayCards;
