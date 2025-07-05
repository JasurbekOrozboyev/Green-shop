import { Box, Typography, Button } from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'; 
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px', 
        padding: '20px',
        textAlign: 'center',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      }}
    >
      <SentimentDissatisfiedIcon sx={{ fontSize: 80, color: '#bdbdbd', mb: 2 }} />
      <Typography variant="h4" component="h2" sx={{ mb: 1, color: '#333', fontWeight: 'bold' }}>
        Sahifa bo'sh
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: '#666', maxWidth: '400px' }}>
        Kechirasiz, bu yerda hech qanday amal bajarilmagan.
      </Typography>
     
      <Button
        variant="contained"
        color="primary"
        sx={{
          backgroundColor: '#46A358', 
          '&:hover': {
            backgroundColor: '#357a3d',
          },
          padding: '10px 25px',
          borderRadius: '5px',
          textTransform: 'none', 
        }}
        component={Link} 
        to="/" 
      >
        Bosh sahifaga qaytish
      </Button>
    </Box>
  );
};

export default NotFound;