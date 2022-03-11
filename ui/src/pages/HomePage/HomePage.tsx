import type { searchTermsObject } from './types';
import { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { defaultSxProps } from 'src/theme';
import { findMatches, type PairingJSON, type PlotValues } from 'src/utils';

import { StepsPanel } from './StepsPanel';
import { ResultsPanel } from './ResultsPanel';
import { HelpPanel } from './HelpPanel';
import { WelcomePanel } from './WelcomePanel';


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


  return (
    <>
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
            styleData={styleData}
            flavorData={flavorData}
            reset={() => {setSearchTerms(null); setResults([])}}
          />
        </Box>
      )}
    </>
  )
}
