import type { Dispatch } from 'react';
import { Autocomplete, TextField } from '@mui/material';

export interface SelectorProps {
  id: string;
  floatingLabel: string;
  placeholder: string;
  maxSelections: number;
  options: string[];
  selectedOptions: string[];
  setSelectedOptions: Dispatch<string[]>;
}

/**
 * An autocomplete-enabled selector component that allows up to the specified number of components to be
 * selected, either by typing or by using a dropdown.
 */
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
        multiple
        autoComplete
        filterSelectedOptions       // hide already-selected options
        getOptionDisabled = {       // prevent additional selections when the max number has been chosen
          () => selectedOptions.length >= maxSelections
        }
        disableClearable
        value={selectedOptions}
        onChange={(event, value) => setSelectedOptions(value)}

        // render the input field as text input; MUI's documentation suggests using this specific function signature
        renderInput={(props) => (
          <TextField
            variant="outlined"
            label={floatingLabel}
            placeholder={placeholder}
            {...props}
          />
        )}
      />
    </>
  );
}
