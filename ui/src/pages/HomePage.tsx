import { useState, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Steps, HelpButton } from '../components';
import { defaultSxProps } from '../themes';
import { findMatches, type PairingJSON } from '../utils';
import ResultsPage from './ResultsPage';

type searchTermsObject = {styles: string[], flavors: string[], abvLimit: number} | null;

export function HomePage(): JSX.Element {
  const [searchTerms, setSearchTerms] = useState<searchTermsObject | null>(null);
  const [results, setResults] = useState<PairingJSON[]>([]);

  useEffect(() => {
    if (searchTerms === null) {
      return;
    }

    const abortController = new AbortController();
    void (async () => {
      try {
        const {styles, flavors, abvLimit} = searchTerms;
        const results = await findMatches(styles, flavors, abvLimit);
        setResults(results);
      } catch (error) {
        console.error(`Something went wrong: ${error}`);
      }
    })();
    return () => abortController.abort();  // cleanup function to abort any outstanding async requests on unmount
  }, [searchTerms]);

  const helpText = [
    'To use this app, first select one to five styles of beer. You may either begin typing or use the dropdown ' +
    'button on the right. If you make a mistake, click the X button to remove an option.',
    'When you\'re ready, press Next to continue to the next step. If you change your mind, use the Back button.',
    'Finally, you may select a maximum ABV (totally optional), verify your choices, and press Complete to get' +
    'a recommendation! If you don\'t like your choices, you may click Start Over!',
  ]

  return (
    <>

      { results.length === 0 && (
        <Box>
          <Container sx={{pt: 4, pb: 1}}>
            <Typography variant="h3" align="center">
              Welcome to BeerWave!
            </Typography>
            <Container sx={{maxWidth: 660}}>
              <Typography variant="subtitle1" align="center" sx={{pb: 3}}>
                Let&rsquo;s find you a beer to pair with your food! Enter what styles of beer you prefer
                and some food flavors, and we&rsquo;ll try to pair your food with a BrewDog beer. 
              </Typography>
            </Container>
          </Container>

          <Container maxWidth="md" sx={{pb: 2}}>
            <Box sx={{ ml: '50em'}}>
              <HelpButton 
                verticalAnchor="bottom"
                horizontalAnchor="left"
                helpText={helpText}
              />
            </Box>
          </Container>

          <Container maxWidth="md" sx={defaultSxProps.get('bordered')}>
            <Steps setSearchTerms={setSearchTerms} />
          </Container>
        </Box>
      )}

      { results.length > 0 && (
        <Box>
          <ResultsPage
            results={results} 
            restart={() => {
              setSearchTerms(null);
              setResults([]);
            }}
          />
        </Box>
      )}
    </>
  )
}
