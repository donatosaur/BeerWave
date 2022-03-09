import type { Dispatch } from 'react';
import { Box, Button, CardHeader, CardActions } from '@mui/material';
import { HelpButton } from '@components';


interface BeerCardHeaderProps {
  setStartOverDialogOpen: Dispatch<boolean>;
  beerName: string;
  tagline: string;
  abv: string | number;
  matchScore: string | number;
}

const helpText = [
  'Basic Features:',
  'To navigate between recommendations, use the left and right arrows at the bottom of each.',
  'To get new recommendations, click the \'Start Over\' button on the top left.',
  '------------------------------------------------------',
  'Advanced Features:',
  'To share your recommendations via twitter, click the share button. This will open a new page, but ' +
  'don\'t worry: your results won\'t go anywhere!',
];


/**
 * CardHeader with a CardActions panel containing a start over button and a help button
 */
export default function BeerCardHeader(props: BeerCardHeaderProps): JSX.Element {
  const {
    setStartOverDialogOpen,
    beerName,
    tagline,
    abv,
    matchScore,
  } = props;
  
  return (
    <>
      <CardActions sx={{flex: 1, justifyContent: 'flex-end'}}>
        <Box sx={{ flexGrow: 1, flexShrink: 1 }}>
          <Button
            variant="contained"
            onClick={() => setStartOverDialogOpen(true)}
          >
            Start Over
          </Button>
        </Box>
        <Box>
          <HelpButton 
            verticalAnchor="bottom"
            horizontalAnchor="left"
            helpText={helpText}
          />
        </Box>
      </CardActions>
    
      <CardHeader 
        title={beerName}
        subheader={`${tagline} ${abv}% ABV`}
      />
      <CardHeader 
        gutterBottom
        subheader={`Match Score: ${matchScore}`}
      />
    </>
  );
}
