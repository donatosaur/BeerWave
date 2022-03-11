import React, { useState } from 'react';
import { StartOverDialog } from 'src/components';
import ProgressIndicator from './ProgressIndicator';
import NavigationPanel from './NavigationPanel';

type Step = {
  label: string;
  nextDisabled: boolean;
  element: JSX.Element;
}

interface RecommendationStepsProps {
  steps: readonly Step[];
  onReset: () => void;
  onComplete: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * MUI Stepper with a reset dialog, progress indicator, and navigation panel
 */
export function RecommendationSteps(props: RecommendationStepsProps): JSX.Element {
  const { steps, onReset, onComplete } = props;
  const [current, setCurrent] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  const lastStep = current === steps.length - 1;
  const CurrentStep = (): JSX.Element => steps[current]['element'];

  // closures
  const closeDialog = (): void => setDialogOpen(false);
  const resetState = (): void => {
    onReset();
    setCurrent(0);
    setDialogOpen(false);
  }

  return (
    <>
      { dialogOpen && (
        <StartOverDialog
          open={dialogOpen}
          onCancel={closeDialog}
          onConfirm={resetState}
        />
      )}
      
      <ProgressIndicator
        currentStep={current}
        stepLabels={steps.map((step) => step.label)}
      />

      <CurrentStep />

      <NavigationPanel 
        backButtonDisabled={current === 0}
        nextButtonDisabled={steps[current]['nextDisabled']}
        lastStep={lastStep}
        onBackButtonClick={() => setCurrent(Math.max(0, current - 1))}
        onNextButtonClick={
          lastStep
            ? onComplete
            : () => setCurrent(Math.min(steps.length - 1, current + 1))
        }
        onStartOverButtonClick={() => setDialogOpen(true)}
      />
    </>
  );
}
