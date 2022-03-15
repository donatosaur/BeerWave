import { Box, Card, CardActions } from '@mui/material';
import { HelpButton } from 'src/components';

export interface ButtonPanelProps {
  buttons: Array<JSX.Element>;
}

const helpText = [
  'Basic Features:',
  'To navigate between recommendations, use the left and right arrows at the bottom of each.',
  'To get new recommendations, click the \'Start Over\' button on the top left.',
  '\v',
  'Advanced Features:',
  'To share your recommendations via twitter, click the share button. This will open a new page, ' +
  ' but don\'t worry: your results won\'t go anywhere!',
];


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
            helpText={helpText}
          />
        </Box>
      </CardActions>
    </Card>
  );
}
