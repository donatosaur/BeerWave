import { Container, Typography } from '@mui/material';


export function WelcomePanel(): JSX.Element {
  return (
    <>
      <Container sx={{pt: 4, pb: 1}}>
        <Typography variant="h3" align="center">
          Welcome to BeerWave!
        </Typography>
        <Container sx={{maxWidth: 660}}>
          <Typography variant="subtitle1" align="center" sx={{pb: 3}}>
            Enter what styles of beer you prefer and some food flavors, and we&rsquo;ll try to pair your food with a
            BrewDog beer. 
          </Typography>
        </Container>
      </Container>
    </>
  );
}
