import type { searchTermsObject } from './types';
import { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { defaultSxProps } from 'src/theme';
import { ErrorAlert } from 'src/components';
import { findMatches, type PairingJSON, type PlotValues } from 'src/utils';

import { StepsPanel } from './StepsPanel';
import { ResultsPanel } from './ResultsPanel';
import { HelpPanel } from './HelpPanel';
import { WelcomePanel } from './WelcomePanel';


export function HomePage(): JSX.Element {
  const [searchTerms, setSearchTerms] = useState<searchTermsObject | null>(null);
  const [results, setResults] = useState<PairingJSON[]>([]);
  const [flavorData, setFlavorData] = useState<PlotValues[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
        setFlavorData(results.flavorSummaryData);
      } catch (error) {
        setErrorMessage(`Something went wrong: ${error}`);
      }
    })();
    return () => abortController.abort();  // abort outstanding requests on unmount
  }, [searchTerms]);


  return (
    <>
      { errorMessage && (
        <ErrorAlert errorMessage={errorMessage} onClose={() => setErrorMessage(null)} />
      )}

      { results.length === 0 && (
        <Box>
          <WelcomePanel />
          <HelpPanel />
          <Container maxWidth="md" sx={defaultSxProps.get('bordered')}>
            <StepsPanel setSearchTerms={setSearchTerms} />
          </Container>
        </Box>
      )}

      { results.length > 0 && (
        <Box>
          <ResultsPanel
            results={results}
            flavorData={flavorData}
            reset={() => {setSearchTerms(null); setResults([])}}
          />
        </Box>
      )}
    </>
  )
}
