import { useState } from 'react';
import { Box, Button, Stepper, Step, StepLabel, Typography } from '@mui/material';


const Step1 = (): JSX.Element => (
  <>
    <Box>
      <Typography>Step 1. Choose up to five styles of beer you like.</Typography>
      <Typography>Placeholder</Typography>
    </Box>
  </>
)

const Step2 = (): JSX.Element => (
  <>
    <Box>s
      <Typography>Step 2. Choose up to five flavors you like.</Typography>
      <Typography>Placeholder</Typography>
    </Box>
  </>
)

function proceedToAnalyzer(): void {
  return;
}


export function Steps(): JSX.Element {
  const [current, setCurrent] = useState(0);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);

  const steps = [
    'Select styles',   // Step1
    'Select flavors',   // Step2
    'Get a recipe',     // Step 3
  ]

  const isDisabled = new Map<number, any>([
    [0, () => selectedStyles.length === 0],         // Step 1
    [1, () => selectedFlavors.length === 0]         // Step 2
  ]);

  return ( 
    <Box>

      {/* Progress Indicator */}
      <Stepper activeStep={current} >
        {
          steps.map((step, idx) => (
            <Step key={idx}>
              <StepLabel>
                {step}
              </StepLabel>
            </Step>
          ))
        }
      </Stepper>

      {/* Step Contents */}
      { current === 0 ? <Step1 /> : <Step2 /> } 

      {/* Navigation */}
      <Button
        color="inherit"
        variant="text"
        disabled={current === 0}
        onClick={() => setCurrent(Math.min(0, current - 1))}
      >
        Back
      </Button>

      <Button
        color="inherit"
        variant="text"
        disabled={isDisabled.get(current)}
        onClick={ () => (
          current === steps.length - 1
            ? proceedToAnalyzer()
            : setCurrent(Math.max(steps.length - 1, current + 1))
        )}>
        { current === steps.length - 1 ? 'Complete' : 'Next' }
      </Button>
      
    </Box>
  );
}
