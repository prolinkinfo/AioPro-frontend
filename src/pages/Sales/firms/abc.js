import React, { useState } from 'react';
import { Chip, MenuItem, Select } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const MultipleSelectWithCloseIcon = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (event) => {
    setSelectedOptions(event.target.value);
  };

  const handleChipDelete = (chipToDelete) => () => {
    setSelectedOptions((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  return (
    <div style={{ width: "100%" }}>
      <Select
        multiple
        fullWidth
        value={selectedOptions}
        onChange={handleSelectChange}
        renderValue={(selected) => (
          <div>
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                onDelete={handleChipDelete(value)}
                deleteIcon={<CloseIcon />}
              />
            ))}
          </div>
        )}
      >
        {/* Replace the items below with your own options */}
        <MenuItem value="option1">Option 1</MenuItem>
        <MenuItem value="option2">Option 2</MenuItem>
        <MenuItem value="option3">Option 3</MenuItem>
      </Select>
    </div>
  );
};

export default MultipleSelectWithCloseIcon;
