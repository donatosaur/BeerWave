import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import Header from './Header';
import Footer from './Footer';

/**
 * React Router <Outlet> wrapped between a site-wide header and a site-wide footer
 */
export function SitewideLayout(): JSX.Element {
  return (
    <>
      <Box sx={{flexGrow: 1, flexShrink: 0}}>
        <Header />
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}
