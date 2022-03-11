import { Step, Stepper, StepLabel } from '@mui/material';

interface ProgressIndicatorProps {
  currentStep: number;
  stepLabels: string[];
}

/**
 * <Stepper> component that serves as a progress indicator
 */
export default function ProgressIndicator(props: ProgressIndicatorProps): JSX.Element {
  const { currentStep, stepLabels } = props;
  return (
    <Stepper activeStep={currentStep} sx={{ p: 1, alignItems: 'center' }}>
      {
        stepLabels.map((label, index) => (
          <Step key={`step-label-${index}`}>
            <StepLabel>
              { label }
            </StepLabel>
          </Step>
        ))
      }
    </Stepper>
  );
}
