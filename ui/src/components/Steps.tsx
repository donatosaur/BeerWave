import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Chip,
  Container,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Stack,
} from '@mui/material';
import { Selector } from '../components'
import { defaultSxProps } from '../themes';
import { styleOptions, flavorOptions, getFlavorSearchTerms } from '../utils';



export function Steps(): JSX.Element {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);

  const steps = [
    'Select styles',    // Step1
    'Select flavors',   // Step2
    'Get a recipe',     // Step 3
  ]

  const Step1 = (): JSX.Element => (
    <>
      <Box sx={defaultSxProps.get('box')}>
        <Typography>Step 1. Choose up to five styles of beer you like.</Typography>

        <Box sx={defaultSxProps.get('box')}>
          <Selector
            id="styles-selector"
            floatingLabel="Styles"
            placeholder="Type or select a style..."
            setSelectedOptions={setSelectedStyles}
            selectedOptions={selectedStyles}
            options={styleOptions}
            maxSelections={5}
          />
        </Box>
      </Box>
    </>
  )
  
  const Step2 = (): JSX.Element => (
    <>
      <Box sx={defaultSxProps.get('box')}>
        <Typography>Step 2. Choose up to five flavors or foods you like.</Typography>

        <Box sx={defaultSxProps.get('box')}>
          <Selector 
            id="flavors-selector"
            floatingLabel="Flavors"
            placeholder="Type or select a flavor..."
            setSelectedOptions={setSelectedFlavors}
            selectedOptions={selectedFlavors}
            options={flavorOptions}
            maxSelections={5}
          />
        </Box>
      </Box>
    </>
  )

  const Step3 = (): JSX.Element => (
    <>
      <Box sx={defaultSxProps.get('box')}>
        <Typography>Verify your selections.</Typography>

        <Typography>Styles:</Typography>
        <Stack direction="row" spacing={2}>
          {
            selectedStyles.map((style) => (
              <Chip
                key={style}
                label={style}
                onDelete={() => setSelectedStyles(selectedStyles.filter((value) => style !== value))}
              />
            ))
          }
        </Stack>

        <Typography>Flavors:</Typography>
        <Stack direction="row" spacing={2}>
          {
            selectedFlavors.map((flavor) => (
              <Chip
                key={flavor}
                label={flavor}
                onDelete={() => setSelectedFlavors(selectedFlavors.filter((value) => flavor !== value))}
              />
            ))
          }
        </Stack>
      </Box>
    </>
  );

  const isDisabled = new Map<number, boolean>([
    [0, selectedStyles.length === 0],         // Step 1 (Select Styles)
    [1, selectedFlavors.length === 0],        // Step 2 (Select Flavors)
    [2, false]                                // Step 3 (Verify Selections)
  ]);

  return ( 
    <Container sx={defaultSxProps.get('container')}>
      <Box>

        {/* Progress Indicator */}
        <Stepper activeStep={current} sx={defaultSxProps.get('stepper')}>
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
        { current === 0 
          ? <Step1 /> 
          : current === 1
            ? <Step2 />
            : <Step3 />
        } 

        {/* Navigation */}
        <Button
          color="inherit"
          variant="text"
          disabled={current === 0}
          onClick={() => setCurrent(Math.max(0, current - 1))}
        >
          Back
        </Button>

        <Button
          color="inherit"
          variant="text"
          disabled={isDisabled.get(current)}
          onClick={ () => (
            current === steps.length - 1
              ? null  // todo; on complete
              : setCurrent(Math.min(steps.length - 1, current + 1))
          )}>
          { current === steps.length - 1 ? 'Complete' : 'Next' }
        </Button>
          
      </Box>
    </Container>
  );
}
