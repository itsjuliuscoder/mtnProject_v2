import React from 'react';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import BaseCard from '../../baseCard/BaseCard';

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

const SizesAutocomplete = () => (
    <Autocomplete
      disablePortal
      id="medium-combo-box-demo"
      style={{ marginTop: '9px' }}
      fullWidth
      sx={{
        mb: 2,
      }}
      renderInput={(params) => (
        <TextField {...params} placeholder="Select Acctype" aria-label="Size Medium" />
      )}
    />
);

export default SizesAutocomplete;
