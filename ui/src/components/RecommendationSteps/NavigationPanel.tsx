import React from 'react';
import { Button } from '@mui/material';


interface NavigationPanelProps {
  backButtonDisabled: boolean;
  nextButtonDisabled: boolean;
  lastStep?: boolean;
  onBackButtonClick: React.MouseEventHandler<HTMLButtonElement>;
  onStartOverButtonClick: React.MouseEventHandler<HTMLButtonElement>;
  onNextButtonClick: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * A panel with buttons for navigation between steps. When lastStep is true, the start over button
 * is displayed and the text of the next button changes from 'Next' to 'Complete'
 */
export default function NavigationPanel(props: NavigationPanelProps): JSX.Element {
  const { 
    backButtonDisabled,
    nextButtonDisabled,
    lastStep = false,
    onBackButtonClick,
    onStartOverButtonClick,
    onNextButtonClick,
  } = props;

  return (
    <>
      <Button
        color="inherit"
        variant="text"
        disabled={backButtonDisabled}
        onClick={onBackButtonClick}
      >
        Back
      </Button>
      
      {(!!lastStep) &&
        <Button
          color="inherit"
          variant="text"
          onClick={onStartOverButtonClick}
        >
          Start Over
        </Button>
      }
  
      <Button
        color="inherit"
        variant="text"
        disabled={nextButtonDisabled}
        onClick={onNextButtonClick}>
        { lastStep ? 'Complete' : 'Next' }
      </Button>
    </>
  );
}
