import { Box, Container, Typography } from '@mui/material';
import { Steps } from '../components';

export function HomePage(): JSX.Element {
  return (
    <>
      <Box>
        <Container>
          <Typography variant="h3" align="center">
            Welcome to BeerWave!
          </Typography>
        </Container>

        <Container>
          <Steps />
        </Container>

      </Box>
    </>
  )
}
