import type { searchTermsObject } from '../types';
import { useState, type Dispatch } from 'react';
import { Box, Container } from '@mui/material';
import { defaultSxProps } from 'src/theme';
import { RecommendationSteps } from 'src/components';
import { getFlavorSearchTerms } from 'src/utils';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';


interface StepPanelProps {
  setSearchTerms: Dispatch<searchTermsObject>;
}


/**
 * Step component for the main page. Guides users through the selection process before
 * making a recommendation.
 */
export function StepsPanel({ setSearchTerms }: StepPanelProps): JSX.Element {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [abvLimit, setAbvLimit] = useState(0);

  // closures
  const resetState = (): void => {
    setSelectedStyles([]);
    setSelectedFlavors([]);
    setAbvLimit(0);
  }
  const onComplete = (): void => {
    setSearchTerms({ styles: selectedStyles, flavors: getFlavorSearchTerms(selectedFlavors), abvLimit });
  }


  const steps = [
    {
      label: 'Select styles',
      nextDisabled: selectedStyles.length === 0,
      element: <Step1 selectedStyles={selectedStyles} setSelectedStyles={setSelectedStyles} />,
    },
    {
      label: 'Select flavors',
      nextDisabled: selectedFlavors.length === 0,
      element: <Step2 selectedFlavors={selectedFlavors} setSelectedFlavors={setSelectedFlavors} />,
    },
    {
      label: 'Get recommendation',
      nextDisabled: selectedStyles.length === 0 || selectedFlavors.length === 0,
      element: 
        <Step3
          selectedStyles={selectedStyles}
          selectedFlavors={selectedFlavors}
          abvLimit={abvLimit}
          setSelectedStyles={setSelectedStyles}
          setSelectedFlavors={setSelectedFlavors}
          setAbvLimit={setAbvLimit}
        />,
    },
  ];

  return ( 
    <>
      <Container sx={defaultSxProps.get('container')}>
        <Box>
          <RecommendationSteps
            steps={steps}
            onReset={resetState}
            onComplete={onComplete}
          />
        </Box>
      </Container>
    </>
  );
}
