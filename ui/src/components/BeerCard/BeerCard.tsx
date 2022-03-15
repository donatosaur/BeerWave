import type { PairingJSON, PlotValues } from 'src/utils';
import { useState } from 'react';
import { Card, Container } from '@mui/material';
import { CardNavigation, type CardNavigationProps } from 'src/components';

import BeerCardHeader from './BeerCardHeader';
import BeerCardBody from './BeerCardBody';
import ChartDialog from './ChartDialog';
import BeerCardActionsPanel from './BeerCardActionsPanel';
import ButtonPanel, { type ButtonPanelProps } from './ButtonPanel';

export interface BeerCardProps extends CardNavigationProps, ButtonPanelProps {
  beer: PairingJSON;
  flavorData: PlotValues[];
}

/**
 * Card component that displays information about a particular beer
 */
export function BeerCard(props: BeerCardProps): JSX.Element {
  const [chartOpen, setChartOpen] = useState(false);
  
  const {
    buttons,
    beer,
    backButtonDisabled,
    nextButtonDisabled,
    onBackButtonClick,
    onNextButtonClick,
    flavorData,
  } = props;

  return (
    <Container sx={{ maxWidth: 600 }}>
      <ButtonPanel buttons={buttons} />
      <Card>
        <BeerCardHeader 
          beerName={beer.name}
          tagline={beer.tagline}
          abv={beer.abv}
          matchScore={beer.matchScore}
        />
        <BeerCardActionsPanel
          beerName={beer.name}
          setChartOpen={setChartOpen}
        />
        <BeerCardBody
          description={beer.description}
          pairings={beer.foodPairing}
        />
        <CardNavigation
          backButtonDisabled={backButtonDisabled}
          nextButtonDisabled={nextButtonDisabled}
          onBackButtonClick={onBackButtonClick}
          onNextButtonClick={onNextButtonClick}
        />
        { chartOpen && (
          <ChartDialog
            data={flavorData}
            chartOpen={chartOpen}
            setChartOpen={setChartOpen}
          />
        )}
      </Card>
    </Container>
  );
}
