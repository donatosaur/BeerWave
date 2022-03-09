import { CardContent, Typography } from '@mui/material';

interface BeerCardBodyProps {
  description: string;
  pairings: string[];
}

/**
 * CardContent body that displays a description and list of pairings
 */
export default function BeerCardBody({ description, pairings }: BeerCardBodyProps): JSX.Element {
  return (
    <CardContent>
      <Typography variant="h6" gutterBottom>Description</Typography>
      <Typography paragraph color="text.caption" variant="body1">{description}</Typography>
      <Typography variant="h6">Food Pairings</Typography>
      {
        pairings?.map((pairing, i) => (
          <Typography key={`pairing-${i}`}>
            {pairing}
          </Typography>
        ))
      }
    </CardContent>
  );
}
