import { Box, Container } from '@mui/material';
import { HelpButton } from 'src/components';


const helpText = [
  'To use this app:',
  '(1) Select at least one style of beer. You may either begin typing or use the dropdown button ' +
  'on the right0 If you add an option by mistake, click the X button to remove it.',
  '(2) When you\'re ready, press Next to continue.',
  '(3) Select at least one flavor in the same way you selected one at least one style. If at any ' +
  'point you want  to go back to the previous step, just press Back.',
  '(4) When you\'re ready, press Next to continue.',
  '(5) Optionally choose a maximum ABV from the dropdown box, verify your choices, and press  ' +
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
            helpText={helpText}
          />
        </Box>
      </Container>
    </>
  );
}
