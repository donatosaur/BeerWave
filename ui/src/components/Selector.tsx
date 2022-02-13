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

        multiple                    // allow multiple selections
        autoComplete                // allow autocomplete while typing
        filterSelectedOptions       // hide already-selected options
        getOptionDisabled = {       // prevent additional selections when the max number has been chosen
          () => selectedOptions.length >= maxSelections
        }
        disableClearable             // the default location (next to the dropdown button) is a recipe for disaster

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
