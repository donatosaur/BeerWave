import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Box, Container, Typography, Link } from '@mui/material';

/**
 * Site-wide footer included in app layout
 */
export default function Footer(): JSX.Element {
  return (
    <Box>
      <AppBar
        position="fixed"
        color="secondary"
        sx={{
          top: 'auto',  // anchored to bottom of sitewide flexbox
          bottom: 0,
          p: 2,
          textAlign: 'center',
          backgroundColor: (theme) => theme.palette.grey[300],
        }}
      >
        <Typography>Site Footer Placeholder</Typography>
      </AppBar>

    </Box>
  );
}