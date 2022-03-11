import React, { useState } from 'react';
import { Button,  Container, Grid, Typography } from '@mui/material'; 
import { BeerCard, StartOverDialog } from 'src/components';
import type { PairingJSON, PlotValues } from 'src/utils';


interface ResultsPageProps {
  reset: () => void;
  styleData: PlotValues[];
  flavorData: PlotValues[];
  results: PairingJSON[];
}

export function ResultsPanel({ results, reset, styleData, flavorData }: ResultsPageProps): JSX.Element {
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
      { dialogOpen && <StartOverDialog open={dialogOpen} onCancel={onCancel} onConfirm={onConfirm} />}
     
      <Container>
        <Grid container spacing={5} sx={{pt: 4}}>
          <PageHeader  />
          <Grid item xs={12} sx={{alignSelf: 'right'}}>
            <BeerCard 
              beer={results[resultIndex]}
              flavorData={flavorData}  //todo; temp
              backButtonDisabled={resultIndex === 0}
              nextButtonDisabled={resultIndex === results.length - 1}
              onBackButtonClick={() => setResultIndex(Math.max(resultIndex - 1, 0))}
              onNextButtonClick={() => setResultIndex(Math.min(resultIndex + 1, results.length - 1))}
              buttons={[<StartOverButton key="start-over" onClick={onStartOverClick} />]}
            />
          </Grid>

          {/* Info Panel */}
          {/* <Grid item xs={4}>
            <Card variant="outlined" sx={{width: 150, height: 150}}>
              <CardMedia
                component="img"
                width="100"
                height="100"
                image=""
                alt={`Placeholder for iamge of ${results[resultIndex].name} from my image service`}
                loading="lazy"
              />
            </Card>
            <Box sx={{pt: 5, width: 200, height: 150}}>
              <Button variant="outlined">
                Display a summary of matches
              </Button>
            </Box>
          </Grid> */}

        </Grid>
      </Container>
    </>
  );
}

type ButtonEventHandler = React.MouseEventHandler<HTMLButtonElement>;

const StartOverButton = ({ onClick }: { onClick: ButtonEventHandler}): JSX.Element => (
  <Button variant="contained" onClick={onClick}>
    Start Over
  </Button>
);


const PageHeader = (): JSX.Element => (
  <Grid item xs={12} sx={{pt: 4, pb: 5}}>
    <Typography variant="h3" align="center">
      Recommendations
    </Typography>
  </Grid>
);
