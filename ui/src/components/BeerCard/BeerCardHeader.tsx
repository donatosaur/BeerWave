import { CardHeader } from '@mui/material';


interface BeerCardHeaderProps {
  beerName: string;
  tagline: string;
  abv: string | number;
  matchScore: string | number;
}


/**
 * CardHeader with summary information
 */
export default function BeerCardHeader(props: BeerCardHeaderProps): JSX.Element {
  const {
    beerName,
    tagline,
    abv,
    matchScore,
  } = props;
  
  return (
    <>   
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
