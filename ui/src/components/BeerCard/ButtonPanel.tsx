import { Box, Card, CardActions, List, ListItem, ListItemText } from '@mui/material';
import { HelpButton } from 'src/components';

export interface ButtonPanelProps {
  buttons: Array<JSX.Element>;
}

/**
 * Card containing any passed buttons and a right-anchored help button
 */
export default function ButtonPanel(props: ButtonPanelProps): JSX.Element {
  const { buttons } = props;

  return (
    <Card elevation={0}>
      <CardActions sx={{ flex: 1, justifyContent: 'flex-end' }}>
        <Box sx={{ flexGrow: 1, flexShrink: 1, pb: 2 }}>
          { buttons }
        </Box>
        <Box>
          <HelpButton 
            verticalAnchor="bottom"
            horizontalAnchor="left"
            helpTextElement={<HelpText />}
          />
        </Box>
      </CardActions>
    </Card>
  );
}


const HelpText = (): JSX.Element => (
  <List dense>
    <MatchScoreHelpItem />
    <NavigationHelpItem />
    <StartOverHelpItem />
    <SeeSummaryHelpItem />
    <AdvancedFeaturesHelpItem />
  </List>
);

const MatchScoreHelpItem = (): JSX.Element => (
  <ListItem>
    <ListItemText
      primary="Match Score"
      secondary="A score above 50 is a good match."
    />
  </ListItem>
);

const NavigationHelpItem = (): JSX.Element => (
  <ListItem>
    <ListItemText
      primary="Navigation"
      secondary="To navigate between recommendations, use the left and right arrows at the
                bottom of each."
    />
  </ListItem>
);

const StartOverHelpItem = (): JSX.Element => (
  <ListItem>
    <ListItemText
      primary="Start Over"
      secondary="To get new recommendations, click the 'Start Over' button on the top left."
    />
  </ListItem>
);

const SeeSummaryHelpItem = (): JSX.Element => (
  <ListItem>
    <ListItemText
      primary="See Summary of Matches"
      secondary="To view the distribution of search terms in your results, press 'See Summary of
                 Matches'"
    />
  </ListItem>
);


const AdvancedFeaturesHelpItem = (): JSX.Element => (
  <ListItem>
    <ListItemText
      primary="Share (Advanced Feature)"
      secondary="To share your recommendations via twitter, click the share button. This will open
                 a new page, but don't worry: your results won't go anywhere!"
    />
  </ListItem>
);
