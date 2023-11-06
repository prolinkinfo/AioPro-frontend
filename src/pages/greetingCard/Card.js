/* eslint-disable arrow-body-style */
import { FormControl, FormLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Card = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role.toLowerCase();
  const userRole = role === 'admin' ? 'admin' : role === 'hr' ? 'hr' : role === 'national manager' ? 'nm' : '';

  return (
    <div style={{ margin: '0px 40px' }}>
      <h1>
        <FormLabel>Please Select</FormLabel>
        <FormControl fullWidth>
          <Select labelId="demo-simple-select-label" id="" name="subject" label="" size="small">
            <MenuItem value="Birthday Card">
              <Link to={`/${userRole}/dashboard/greetingcard/birthdaycard`}>Birthday Card</Link>
            </MenuItem>
            <MenuItem value="Doctor Card">
              <Link to={`/${userRole}/dashboard/greetingcard/doctordaycard`}>Doctorday Card</Link>
            </MenuItem>
            <MenuItem value="New Year Card">
              <Link to={`/${userRole}/dashboard/greetingcard/newyearcard`}>New Year Card</Link>
            </MenuItem>
            <MenuItem value="Anniversary Card">
              <Link to={`/${userRole}/dashboard/greetingcard/anniversarycard`}>Anniversary Card</Link>
            </MenuItem>
          </Select>
        </FormControl>
      </h1>
    </div>
  );
};

export default Card;
