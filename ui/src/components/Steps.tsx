import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Stack,
  SxProps
} from '@mui/material';
import { Selector } from '../components'
import { defaultSxProps } from '../themes';
import { styleOptions, flavorOptions, getFlavorSearchTerms } from '../utils';


/**
 * Sx props for component-specific subcomponents.
 */
const stepperSxProp: SxProps = { p: 1, alignItems: 'center' };
const stepTypographySxProp: SxProps = { my: 2, mx: 0.5 };
const stepStackSxProp: SxProps = { m: 1, p: 1 };
const selectorBoxSxProp: SxProps = { mt: 3, mb: 2 };


/**
 * Step component for the main page. Guides users through the selection process before
 * making a recommendation.
 */
export function Steps(): JSX.Element {
  const navigate = useNavigate();

  // Stepper States  
  const [current, setCurrent] = useState(0);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);

  // Confirmation Modal States
  const [dialogOpen, setDialogOpen] = useState(false);


  const Step1 = (): JSX.Element => (
    <>
      <Box sx={defaultSxProps.get('box')}>
        <Typography sx={stepTypographySxProp}>
          Step 1. Choose up to five styles of beer you like.
        </Typography>

        <Box sx={selectorBoxSxProp}>
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
  );
  
  const Step2 = (): JSX.Element => (
    <>
      <Box sx={defaultSxProps.get('box')}>
        <Typography sx={stepTypographySxProp}>
          Step 2. Choose up to five flavors or foods you like.
        </Typography>

        <Box sx={selectorBoxSxProp}>
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
  );

  const Step3 = (): JSX.Element => (
    <>
      <Box sx={defaultSxProps.get('box')}>
        <Typography sx={stepTypographySxProp}>
          Verify your selections.
        </Typography>

        <Typography>Styles:</Typography>
        <Stack direction="row" spacing={2} sx={stepStackSxProp}>
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
        <Stack direction="row" spacing={2} sx={stepStackSxProp}>
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

  /**
   * Resets state
   */
  const startOver = (): void => {
    setCurrent(0);
    setSelectedStyles([]);
    setSelectedFlavors([]);
    setDialogOpen(false);
  }

  /**
   * A modal that confirms that the user really wants to start over
   */
  const StartOverDialog = (): JSX.Element => (
    <Dialog maxWidth="xs" open={dialogOpen} onClose={() => setDialogOpen(false)}>
      <DialogTitle>Start over?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Starting over will bring you back to Step 1 and erase all your selections.
        </DialogContentText>
        <DialogActions>
          <Button variant="text" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="text" onClick={startOver}>
            Confirm
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );

  /**
   * An array mapping each step value (indexed from 0) to an array (value) that contains the following
   * in this exact order:
   *   value[0]: a string containing the text to be displayed under the stepper for that step
   *   value[1]: a boolean determining whether the 'next' button is disabled
   *   value[2]: a JSX element <Step> representing the contents for that step
   * 
   */
  const steps: readonly [string, boolean, JSX.Element][] = [
    // Step 1 (Select Styles)
    [
      'Select styles',
      selectedStyles.length === 0,
      <Step1 key='1' />
    ],
    // Step 2 (Select Flavors)
    [
      'Select flavors',
      selectedFlavors.length === 0,
      <Step2 key='2' />
    ],
    // Step 3 (Verify Selections)
    [
      'Get a recipe',
      selectedStyles.length === 0 || selectedFlavors.length === 0,
      <Step3 key='3' />
    ],  
  ];

  const getIsDisabled = (current: number): boolean => steps[current][1];
  const getStep = (current: number): JSX.Element => steps[current][2];

  return ( 
    <>
      { dialogOpen && <StartOverDialog />}

      <Container sx={defaultSxProps.get('container')}>
        <Box>
  
          {/* Progress Indicator */}
          <Stepper activeStep={current} sx={stepperSxProp}>
            {
              steps.map((step, idx) => (
                <Step key={idx}>
                  <StepLabel>
                    { step[0] }
                  </StepLabel>
                </Step>
              ))
            }
          </Stepper>
  
          {/* Step Contents */}
          { getStep(current) } 
  
          {/* Navigation */}
          <Button
            color="inherit"
            variant="text"
            disabled={current === 0}
            onClick={() => setCurrent(Math.max(0, current - 1))}
          >
            Back
          </Button>
  
          { (current === steps.length - 1) &&
            <Button
              color="inherit"
              variant="text"
              onClick={() => setDialogOpen(true)}
            >
              Start Over
            </Button>
          }
  
          <Button
            color="inherit"
            variant="text"
            disabled={getIsDisabled(current)}
            onClick={ () => (
              current === steps.length - 1
                ? null  // todo; on complete
                : setCurrent(Math.min(steps.length - 1, current + 1))
            )}>
            { current === steps.length - 1 ? 'Complete' : 'Next' }
          </Button>
            
        </Box>
      </Container>
    </>
  );
}
