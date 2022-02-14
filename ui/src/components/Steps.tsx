import { useState, type Dispatch } from 'react';
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
  InputLabel,
  FormControl,
  Stack,
  Select,
  MenuItem,
  type SxProps
} from '@mui/material';
import { Selector } from '../components'
import { defaultSxProps } from '../themes';
import { styleOptions, flavorOptions, getFlavorSearchTerms } from '../utils';


interface StepsProps {
  setSearchTerms: Dispatch<any>;  // set to any for now to get MVP functioning
}


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
export function Steps({ setSearchTerms }: StepsProps): JSX.Element {

  // Stepper States  
  const [current, setCurrent] = useState(0);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [abvLimit, setAbvLimit] = useState(0);

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
        <Typography variant= "h6" sx={stepTypographySxProp}>
          <strong>(Optional)</strong> Select a maximum ABV:
        </Typography>
        <FormControl sx={{minWidth: 200, pb: 4}}>
          <InputLabel id='abv-limit'>ABV Limit (Optional)</InputLabel>
          <Select
            label='ABV Limit (Optional)'
            labelId='abv-limit'
            value={abvLimit}
            onChange={(event) => setAbvLimit(Number.parseFloat(`${event.target.value}`) || 0)}
          >
            <MenuItem value={0}>unlimited</MenuItem>
            <MenuItem value={4.0}>4.0 %</MenuItem>
            <MenuItem value={5.0}>5.0 %</MenuItem>
            <MenuItem value={6.0}>6.0 %</MenuItem>
            <MenuItem value={7.0}>7.0 %</MenuItem>
            <MenuItem value={8.0}>8.0 %</MenuItem>
            <MenuItem value={9.0}>9.0 %</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{pb: 2}}>
          <Typography variant= "h6" sx={stepTypographySxProp} paragraph>Verify your selections:</Typography>

          <Stack direction="row" spacing={2} sx={stepStackSxProp}>
            <Typography variant="body1" sx={{me: 1, pt: 1}} >Styles:</Typography>
            {
              selectedStyles.map((style) => (
                <Chip
                  key={style}
                  label={style}
                  onDelete={selectedStyles.length > 1
                    ? () => setSelectedStyles(selectedStyles.filter((value) => style !== value))
                    : undefined  // not passing a function removes the delete icon
                  }
                />
              ))
            }
          </Stack>

          <Stack direction="row" spacing={2} sx={stepStackSxProp}>
            <Typography variant="body1" sx={{me: 1, pt: 1}}>Flavors:</Typography>
            {
              selectedFlavors.map((flavor) => (
                <Chip
                  key={flavor}
                  label={flavor}
                  onDelete={selectedFlavors.length > 1 
                    ? () => setSelectedFlavors(selectedFlavors.filter((value) => flavor !== value))
                    : undefined  // not passing a function removes the delete icon
                  }
                />
              ))
            }
          </Stack>
        </Box>
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
      'Get recommendation',
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
                ? setSearchTerms({styles: selectedStyles, flavors: getFlavorSearchTerms(selectedFlavors), abvLimit})
                : setCurrent(Math.min(steps.length - 1, current + 1))
            )}>
            { current === steps.length - 1 ? 'Complete' : 'Next' }
          </Button>
            
        </Box>
      </Container>
    </>
  );
}
