import type { Dispatch } from 'react';
import { Box, Typography } from '@mui/material';
import { Selector } from 'src/components'
import { defaultSxProps } from 'src/theme';
import { flavorOptions } from 'src/utils';


interface Step2Props {
  setSelectedFlavors: Dispatch<string[]>;
  selectedFlavors: string[];
}


/**
 * Step that prompts users to select food flavors
 */
export default function Step2({ setSelectedFlavors, selectedFlavors }: Step2Props): JSX.Element {
  return (
    <>
      <Box sx={defaultSxProps.get('box')}>
        <Typography sx={defaultSxProps.get('stepTypography')}>
          Step 2. Choose up to five flavors or foods you like.
        </Typography>

        <Box sx={defaultSxProps.get('selectorBox')}>
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
}
