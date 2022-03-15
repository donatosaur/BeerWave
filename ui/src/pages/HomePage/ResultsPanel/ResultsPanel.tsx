import React, { useState } from 'react';
import { Button, Container, Stack, Typography } from '@mui/material'; 
import { BeerCard, StartOverDialog } from 'src/components';
import type { PairingJSON, PlotValues } from 'src/utils';


interface ResultsPageProps {
  reset: () => void;
  flavorData: PlotValues[];
  results: PairingJSON[];
}

/**
 * Displays results as navigatable cards
 */
export function ResultsPanel({ results, reset, flavorData }: ResultsPageProps): JSX.Element {
  const [resultIndex, setResultIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  // closures
  const onStartOverClick = (): void => setDialogOpen(true);
  const onCancel = (): void => setDialogOpen(false);
  const onConfirm = (): void => {
    setDialogOpen(false);
    reset();
  }

  return (
    <>
      { dialogOpen && (
        <StartOverDialog
          open={dialogOpen}
          onCancel={onCancel}
          onConfirm={onConfirm}
        />
      )}
     
      <Container>
        <Stack alignItems="center" sx={{pt: 4}}>
          <PageHeader  />
          <BeerCard
            beer={results[resultIndex]}
            flavorData={flavorData}  //todo; temp
            backButtonDisabled={resultIndex === 0}
            nextButtonDisabled={resultIndex === results.length - 1}
            onBackButtonClick={() => setResultIndex(Math.max(resultIndex - 1, 0))}
            onNextButtonClick={() => setResultIndex(Math.min(resultIndex + 1, results.length - 1))}
            buttons={[<StartOverButton key="start-over" onClick={onStartOverClick} />]}
          />
        </Stack>
      </Container>
    </>
  );
}

type ButtonEventHandler = React.MouseEventHandler<HTMLButtonElement>;

const StartOverButton = ({ onClick }: { onClick: ButtonEventHandler}): JSX.Element => (
  <Button variant="contained" size="small" onClick={onClick}>
    Start Over
  </Button>
);


const PageHeader = (): JSX.Element => (
  <Typography variant="h3" align="center" sx={{pt: 4, pb: 5}}>
    Recommendations
  </Typography>
);
