import { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { Steps } from '../components';
import { defaultSxProps } from '../themes';

type searchTermsObject = {styles: string[], flavors: string[], abvLimit: number} | null;

export function HomePage(): JSX.Element {
  const [searchTerms, setSearchTerms] = useState<searchTermsObject | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searchTerms === null) {
      return;
    }

    



  }, [searchTerms]
  )

  return (
    <>
      <Box>
        <Container sx={{pt: 4, pb: 5}}>
          <Typography variant="h3" align="center">
            Welcome to BeerWave!
          </Typography>
        </Container>

        <Container maxWidth="md" sx={defaultSxProps.get('bordered')}>
          <Steps setSearchTerms={setSearchTerms} />
        </Container>

      </Box>

      { showResults && (
        <Box>
          <Container />
        </Box>
      )}


    </>
  )
}
