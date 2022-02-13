import { Box, Container, Grid, Typography } from '@mui/material';
import { Steps } from '../components';
import { defaultSxProps } from '../themes';

export function HomePage(): JSX.Element {
  return (
    <>
      <Box>
        <Container sx={{pt: 4, pb: 5}}>
          <Typography variant="h3" align="center">
            Welcome to BeerWave!
          </Typography>
        </Container>

        <Container maxWidth="md" sx={defaultSxProps.get('bordered')}>
          <Steps />
        </Container>

      </Box>
    </>
  )
}
