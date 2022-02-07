import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Box, Container, Typography, Link } from '@mui/material';

/**
 * Site-wide header included in app layout
 */
export default function Header(): JSX.Element {
  return (
    <Box>
      <AppBar 
        variant="outlined"
        position="sticky"
        sx={{ 
          p: 2,
          textAlign: 'center',
          zIndex: (theme) => theme.zIndex.drawer + 50
        }}
      >
        <Typography> Site Header Placeholder </Typography>
          
      </AppBar>
    </Box>
  );
}
