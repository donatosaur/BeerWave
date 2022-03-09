import type { Dispatch } from 'react';
import { Button, CardActions } from '@mui/material';
import { NorthEast } from '@mui/icons-material';
import { TwitterShareButton } from '@components';

interface ActionsPanelProps {
  setChartOpen: Dispatch<boolean>;
  beerName: string;
}

/**
 * CardActions panel with a twitter share button and a button that opens a pie chart modal
 */
export default function BeerCardActionsPanel({ beerName, setChartOpen }: ActionsPanelProps): JSX.Element {
  const message = `BeerWave just recommended this awesome beer to me: BrewDog's ${beerName}`;
  
  return (
    <CardActions sx={{flex: 1, justifyContent: 'flex-end'}}>
      <Button
        variant="contained"
        endIcon={<NorthEast />}
        onClick={() => setChartOpen(true)}
      >
        See Summary of Matches
      </Button>
      <TwitterShareButton message={message} />
    </CardActions>
  );
}
