import type { Dispatch } from 'react';
import { Box, Typography } from '@mui/material';
import { defaultSxProps } from 'src/theme';

import ABVSelector from './ABVSelector';
import StepStack from './StepStack';


interface Step3Props {
  setSelectedStyles: Dispatch<string[]>;
  setSelectedFlavors: Dispatch<string[]>;
  setAbvLimit: Dispatch<string>;
  selectedStyles: string[];
  selectedFlavors: string[];
  abvLimit: string;
}

/**
 * Step that prompts users to confirm selections
 */
export default function Step3(props: Step3Props): JSX.Element {
  const {
    setSelectedStyles,
    setSelectedFlavors,
    setAbvLimit,
    selectedStyles,
    selectedFlavors,
    abvLimit,
  } = props;

  
  return (
    <>
      <Box sx={defaultSxProps.get('box')}>
        <ABVInstructions />
        <ABVSelector
          abvLimit={abvLimit}
          setAbvLimit={setAbvLimit}
          minAbv={4.0}
          maxAbv={9.0}
        />

        <Box sx={{pb: 2}}>
          <VerificationInstructions />
          <StepStack
            label="Styles:"
            selections={selectedStyles}
            setSelections={setSelectedStyles}
          />
          <StepStack 
            label="Flavors:"
            selections={selectedFlavors}
            setSelections={setSelectedFlavors}
          />
        </Box>
      </Box>
    </>
  );
}


const ABVInstructions = (): JSX.Element => (
  <Typography variant="body1" sx={defaultSxProps.get('stepTypography')}>
    <strong>(Optional)</strong> Select a maximum ABV:
  </Typography>
);


const VerificationInstructions = (): JSX.Element => (
  <Typography variant="body1" sx={defaultSxProps.get('stepTypography')} paragraph>
    Verify your selections:
  </Typography>
);
