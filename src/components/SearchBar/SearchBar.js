import { useState } from 'react';
import { Box, TextField, Button, ButtonGroup, Typography, MenuItem } from '@mui/material';
import { SearchRounded } from '@mui/icons-material';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import HouseIcon from '@mui/icons-material/House';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import "../../components/SearchBar/SearchBar.module.css"

const propertyOptions = [
  { type: 'All Residentials', icon: <BorderAllIcon style={{ color: '#443D66' }} /> },
  { type: 'Home', icon: <HouseIcon style={{ color: '#443D66' }} /> },
  { type: 'Apartment', icon: <ApartmentIcon style={{ color: '#443D66' }} /> },
  { type: 'Building', icon: <LocationCityIcon style={{ color: '#443D66' }} /> },
];

const userInterest = [
  { type: 'buy' },
  { type: 'sell' },
  { type: 'rent' },
  { type: 'invest' },
  { type: 'finance' },
];

export default function Search({ showUP780, showDown780px }) {
  const optionArea = '40';
  const [option, setOption] = useState('All Residentials');

  function handleChange(event) {
    setOption(event.target.value);
    console.log(option);
  }

  return (
    <Box className='homebox'>
      <Box sx={{ display: 'flex' }}>
        <ButtonGroup fullWidth>
          {userInterest.map((item) => (
            <Button key={item.type} id={item.type} color='inherit' variant='contained'
              sx={{ backgroundColor: '#313f82', borderTopRightRadius: '20px', borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px', borderTopLeftRadius: '20px', color: '#CED0C8' }}>
              {item.type}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
      <Box sx={{ width: '100%', display: 'flex', height: '56px' }}>
        <TextField select value={option} onChange={handleChange}
          sx={{ width: `${optionArea}%`, outline: 'none', height: '56px', padding: 'auto', backgroundColor: '#ffff', borderBottomLeftRadius: '20px' }}>
          {propertyOptions.map((option) => (
            <MenuItem key={option.type} value={option.type}>
              {showUP780 && <Typography>{option.type}</Typography>}
              {showDown780px && <Typography>{option.icon}</Typography>}
            </MenuItem>
          ))}
        </TextField>
        
        <TextField variant="filled" label={<SearchRounded />}
          sx={{ alignContent: 'start', height: '56px', backgroundColor: '#ffff' }}
          fullWidth />
        <Button variant='contained'
          sx={{ borderBottomRightRadius: '20px', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px', width: '14%', border: 'none', margin: '0px', padding: 'auto 10px', borderTopRightRadius: '0px' }}>
          Search
        </Button>
      </Box>
    </Box>
  );
          }
