import { AppBar, Box, Typography } from '@mui/material';

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
        <Typography>BeerWave: a beer recipe and food pairer</Typography>
      </AppBar>
    </Box>
  );
}
