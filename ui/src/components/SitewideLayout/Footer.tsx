import { AppBar, Box, Typography, Link } from '@mui/material';
import { defaultSxProps } from 'src/theme';


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
          ...defaultSxProps.get('footer'),
          backgroundColor: (theme) => theme.palette.grey[300],
        }}
      >
        <Typography variant="caption">
          App crafted by <Link href="https://github.com/donatosaur/BeerWave">Donato Quartuccia</Link>.&nbsp;
          To use this app, you must be of legal drinking age.
        </Typography>
        <Typography variant="caption" display="inline">
          Powered by <Link href="https://punkapi.com">PunkAPI</Link> with beer recipes and data kindly
          provided by <Link href="https://www.brewdog.com/uk/diy-dog">BrewDog&rsquo;s DIY Dog project</Link>.
        </Typography>
      </AppBar>
    </Box>
  );
}
