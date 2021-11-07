import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
const SearchBar = ()=>{
    return (
        <Box className='searchBar' >
            <TextField id="outlined-basic" label="Search" variant="outlined"
            placeholder='Search'  InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon />   </InputAdornment>,
          }} />      
        </Box>
    )
}

export default SearchBar;