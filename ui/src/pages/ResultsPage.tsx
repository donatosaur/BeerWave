import { useState, type Dispatch } from 'react';
import { Box, Container, Grid, Stack, Typography, Button, IconButton } from '@mui/material';
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { Card, CardHeader, CardActions, CardContent, CardMedia } from '@mui/material';
// import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from '@mui/material';
import { ChevronLeft, ChevronRight, Twitter, NorthEast } from '@mui/icons-material'
import type { PairingJSON, PlotValues } from '../utils';
import { HelpButton, ChartImageCardMedia } from '../components';


// interface ResultsListProps {
//   results: PairingJSON[];
//   onResultClick: Dispatch<number>;
// }

// function ResultsTable({results, onResultClick}: ResultsListProps): JSX.Element {
//   results = results.concat(results).concat(results);
//   return (
//     <TableContainer>
//       <Table size="small" sx={{minWidth: 300, maxWidth: 300}}>
//         <TableHead>
//           <TableRow>
//             <TableCell>Beer</TableCell>
//             <TableCell>ABV</TableCell>
//             <TableCell>Match</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {
//             results.map((result, index) => (  
//               <TableRow key={result.id} onClick={() => onResultClick(index)}>    
//                 <TableCell>{`${result.name}`}</TableCell>
//                 <TableCell>{`${result.abv}%`}</TableCell>
//                 <TableCell>{`${result.matchScore}`}</TableCell>
//               </TableRow>
//             ))
//           }
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

interface BeerCardProps {
  beer: PairingJSON,
  backButtonDisabled: boolean;
  nextButtonDisabled: boolean;
  onBackButtonClick: () => void;
  onNextButtonClick: () => void;
  setDialogOpen: Dispatch<boolean>;
  flavorData: PlotValues[];  //todo; temp
}

function BeerCard(props: BeerCardProps): JSX.Element {
  const [chartOpen, setChartOpen] = useState(false);
  
  const {
    beer,
    backButtonDisabled,
    nextButtonDisabled,
    onBackButtonClick,
    onNextButtonClick,
    setDialogOpen,
    flavorData, // todo; temp
  } = props;

  const CardNavigation = (): JSX.Element => (
    <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
      <Box sx={{ flexGrow: 1, flexShrink: 1 }}>
        <IconButton 
          disabled={backButtonDisabled}
          onClick={onBackButtonClick}
        >
          <ChevronLeft />
        </IconButton>
      </Box>
      <Box>
        <IconButton
          disabled={nextButtonDisabled}
          onClick={onNextButtonClick}
        >
          <ChevronRight />
        </IconButton>
      </Box>
    </CardContent>
  );

  // Temporary; this is for integration
  const ChartDialog = (): JSX.Element => (
    <Dialog maxWidth="md" open={chartOpen} onClose={() => setChartOpen(false)}>
      <DialogTitle>Summary</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Card variant="outlined" sx={{width: 500, height: 400}}>
            <ChartImageCardMedia 
              title="Flavor Matches Among All Beers Searched"
              values={flavorData}
              width="500"
              height="400"
            />
          </Card>
        </DialogContentText>
        <DialogActions>
          <Button variant="text" onClick={() => setChartOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );

  const helpText = [
    'Basic Features:',
    'To navigate between recommendations, use the left and right arrows at the bottom of each.',
    'To get new recommendations, click the \'Start Over\' button on the top left.',
    '------------------------------------------------------',
    'Advanced Features:',
    'To share your recommendations via twitter, click the share button. This will open a new page, but ' +
    'don\'t worry: your results won\'t go anywhere!',
    // 'To bookmark a recommendation so you can revisit it later, click save.',
  ]

  return (
    <Card sx={{maxWidth: 600}}>
      <>
        <CardActions sx={{flex: 1, justifyContent: 'flex-end'}}>
          <Box sx={{ flexGrow: 1, flexShrink: 1 }}>
            <Button
              variant="contained"
              onClick={() => setDialogOpen(true)}
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
          title={beer.name}
          subheader={`${beer.tagline} ${beer.abv}% ABV`}
        />
        <CardHeader 
          gutterBottom
          subheader={`Match Score: ${beer.matchScore}`}
        />
      </>

      {chartOpen && <ChartDialog />}


      {/* Share/Save Panel */}
      <CardActions sx={{flex: 1, justifyContent: 'flex-end'}}>
        <Button
          variant="contained"
          endIcon={<NorthEast />}
          onClick={() => setChartOpen(true)}
        >
          See Summary of Matches
        </Button>

        {/* <Button
          variant="contained"
          endIcon={<Bookmark />}
          onClick={() => alert('Save action')}
        >
          Save
        </Button> */}
        <Button
          variant="contained"
          endIcon={<Twitter />}
          onClick={() => {
            // build tweet template (see https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/)
            const message = `BeerWave just recommended this awesome beer to me: BrewDog's ${beer.name}`;
            const to = encodeURI(`https://twitter.com/intent/tweet?text=${message}`);
            const [target, features] = ['_blank', 'noopener'];  // security (completely new window)
            window.open(to, target, features);
          }}
        >
          Share
        </Button>
      </CardActions>
      <CardContent>
        <Typography variant="h6" gutterBottom>Description</Typography>
        <Typography paragraph color="text.caption" variant="body1">{beer.description}</Typography>
        <Typography variant="h6">Food Pairings</Typography>
        {
          beer.foodPairing?.map((pairing, i) => (
            <Typography key={`${beer.id}${i}`}>
              {pairing}
            </Typography>
          ))
        }
      </CardContent>
      <CardNavigation />
    </Card>
  );
}

interface ResultsPageProps {
  restart: () => void;
  styleData: PlotValues[];
  flavorData: PlotValues[];
  results: PairingJSON[];
}

export default function ResultsPage({ results, styleData, flavorData, restart }: ResultsPageProps): JSX.Element {
  const [resultIndex, setResultIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  const StartOverDialog = (): JSX.Element => (
    <Dialog maxWidth="xs" open={dialogOpen} onClose={() => setDialogOpen(false)}>
      <DialogTitle>Start over?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Starting over will erase all your recommendations.
        </DialogContentText>
        <DialogActions>
          <Button variant="text" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="text" onClick={() => {
            setDialogOpen(false);
            restart();
          }}>
            Confirm
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      { dialogOpen && <StartOverDialog />}
      <Container>
        <Grid container spacing={5} sx={{pt: 4}}>
          {/* Page Header Text */}
          <Grid item xs={10} sx={{pt: 4, pb: 5}}>
            <Typography variant="h3" align="center">
              Recommendations
            </Typography>
          </Grid>

          {/* Result */}
          <Grid item xs={12} sx={{alignSelf: 'right'}}>
            <BeerCard 
              beer={results[resultIndex]}
              flavorData={flavorData}  //todo; temp
              backButtonDisabled={resultIndex === 0}
              nextButtonDisabled={resultIndex === results.length - 1}
              onBackButtonClick={() => setResultIndex(Math.max(resultIndex - 1, 0))}
              onNextButtonClick={() => setResultIndex(Math.min(resultIndex + 1, results.length - 1))}
              setDialogOpen={setDialogOpen}
            />
          </Grid>

          {/* Info Panel */}
          {/* <Grid item xs={4}>
            <Stack>
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
              <Card variant="outlined" sx={{width: 200, height: 200}}>
                <ChartImageCardMedia 
                  title="Style Matches Among All Beers Searched"
                  values={styleData}
                  width="200"
                  height="200"
                />
              </Card>
              <Card variant="outlined" sx={{width: 400, height: 400}}>
                <ChartImageCardMedia 
                  title="Flavor Matches Among All Beers Searched"
                  values={flavorData}
                  width="400"
                  height="400"
                />
              </Card>
            </Stack>
          </Grid> */}

        </Grid>
      </Container>
    </>
  );
}
