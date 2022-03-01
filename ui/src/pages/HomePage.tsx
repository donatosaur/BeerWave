import { useState, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Steps, HelpButton } from '../components';
import { defaultSxProps } from '../themes';
import { findMatches, type PairingJSON, type PlotValues } from '../utils';
import ResultsPage from './ResultsPage';

type searchTermsObject = {styles: string[], flavors: string[], abvLimit: number} | null;

export function HomePage(): JSX.Element {
  const [searchTerms, setSearchTerms] = useState<searchTermsObject | null>(null);
  const [results, setResults] = useState<PairingJSON[]>([]);
  const [styleData, setStyleData] = useState<PlotValues[]>([]);
  const [flavorData, setFlavorData] = useState<PlotValues[]>([]);


  useEffect(() => {
    if (searchTerms === null) {
      return;
    }

    const abortController = new AbortController();
    void (async () => {
      try {
        const {styles, flavors, abvLimit} = searchTerms;
        const results = await findMatches(styles, flavors, abvLimit);
        setResults(results.pairings);
        setStyleData(results.styleSummaryData);
        setFlavorData(results.flavorSummaryData);
      } catch (error) {
        console.error(`Something went wrong: ${error}`);
      }
    })();
    return () => abortController.abort();  // cleanup function to abort any outstanding async requests on unmount
  }, [searchTerms]);

  const helpText = [
    'To use this app:',
    '(1) Select at least one style of beer. You may either begin typing or use the dropdown button on the right. ' +
    'If you add an option by mistake, click the X button to remove it.',
    '(2) When you\'re ready, press Next to continue.',
    '(3) Select at least one flavor in the same way you selected one at least one style. If at any point you want ' +
    'to go back to the previous step, just press Back.',
    '(4) When you\'re ready, press Next to continue.',
    '(5) Optionally choose a maximum ABV from the dropdown box, verify your choices, and press Complete to receive ' +
    'a recommendation!',
    'Note: if you don\'t like your choices, you can click Start Over instead to begin the process from scratch.'
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
            styleData={styleData}
            flavorData={flavorData}
            restart={() => {
              setSearchTerms(null);
              setResults([]);
              setStyleData([]);
              setFlavorData([]);
            }}
          />
        </Box>
      )}
    </>
  )
}
