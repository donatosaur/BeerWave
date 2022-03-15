import { Box, Container, List, ListItem, ListItemText, ListSubheader } from '@mui/material';
import { HelpButton } from 'src/components';


const text = [
  'Select at least one style of beer. You may either begin typing or use the dropdown button ' +
  'on the right. If you add an option by mistake, click the X button to remove it.',
  'When you\'re ready, press Next to continue.',
  'Select at least one flavor in the same way you selected one at least one style. If at any ' +
  'point you want  to go back to the previous step, just press Back.',
  'When you\'re ready, press Next to continue.',
  'Optionally choose a maximum ABV from the dropdown box, verify your choices, and press  ' +
  'Complete to receive a recommendation! If you don\'t like your choices, you can click Start ' +
  'Over to begin the process from scratch.'
]


export function HelpPanel(): JSX.Element {
  return (
    <>
      <Container maxWidth="md" sx={{pb: 2}}>
        <Box sx={{ ml: '50em'}}>
          <HelpButton 
            verticalAnchor="bottom"
            horizontalAnchor="left"
            helpTextElement={<HelpText />}
          />
        </Box>
      </Container>
    </>
  );
}


const HelpText = (): JSX.Element => (
  <List dense>
    { text.map((textItem, index) => (
      <ListItem key={`help-text-${index}`}>
        <ListItemText
          primary={`Step ${index + 1}`}
          secondary={textItem}
        />
      </ListItem>
    ))
    }
  </List>
);
