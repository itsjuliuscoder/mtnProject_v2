import React from 'react';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import BaseCard from '../../baseCard/BaseCard';

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const selectData = [
  { label: 'Individual', value: 'Individual'  },
  { label: 'Merchant', value: 'Merchant' }
];

const SizesAutocomplete = () => (
    <Autocomplete
      disablePortal
      id="medium-combo-box-demo"
      options={selectData}
      style={{ marginTop: '9px' }}
      fullWidth
      sx={{
        mb: 2,
      }}
      renderInput={(params) => (
        <TextField {...params} placeholder="Size Medium" aria-label="Size Medium" />
      )}
    />
);

export default SizesAutocomplete;
