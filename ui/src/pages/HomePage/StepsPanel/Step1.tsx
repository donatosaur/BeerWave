import type { Dispatch } from 'react';
import { Box, Typography } from '@mui/material';
import { Selector } from 'src/components'
import { defaultSxProps } from 'src/theme';
import { styleOptions } from 'src/utils';


interface Step1Props {
  setSelectedStyles: Dispatch<string[]>;
  selectedStyles: string[];
}


/**
 * Step that prompts users to select beer styles
 */
export default function Step1({ setSelectedStyles, selectedStyles }: Step1Props): JSX.Element {
  return (
    <>
      <Box sx={defaultSxProps.get('box')}>
        <Typography sx={defaultSxProps.get('stepTypography')}>
          Step 1. Choose up to five styles of beer you like.
        </Typography>

        <Box sx={defaultSxProps.get('selectorBox')}>
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
}
