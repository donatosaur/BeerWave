import  { Autocomplete, TextField } from '@mui/material';
import { Dispatch } from 'react';

interface SelectorProps {
  id: string;
  floatingLabel: string;
  placeholder: string;
  maxSelections: number;
  options: string[];
  selectedOptions: string[];
  setSelectedOptions: Dispatch<string[]>;
}

export function Selector(props: SelectorProps): JSX.Element {
  const {
    id, 
    options, 
    floatingLabel, 
    maxSelections, 
    placeholder, 
    setSelectedOptions,
    selectedOptions
  } = props;

  return (
    <>
      <Autocomplete
        id={id}
        options={options}

        multiple                    // allow multiple selections
        autoComplete                // allow autocomplete while typing
        filterSelectedOptions       // hide already-selected options
        getOptionDisabled = {       // prevent additional selections when the max number has been chosen
          () => selectedOptions.length >= maxSelections
        }

        // store the selected options
        value={selectedOptions}
        onChange={(event, value) => setSelectedOptions(value)}

        // render the input field as text input; MUI's documentation suggests this function signature
        renderInput={(props) => (
          <TextField
            variant="outlined"
            label={floatingLabel}
            placeholder={placeholder}
            {...props}                 // pass any additional props from autocomplete down to the input field
          />
        )}
      />
    </>
  );
}
