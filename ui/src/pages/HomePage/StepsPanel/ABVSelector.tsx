import type { Dispatch } from 'react';
import { FormControl, MenuItem, InputLabel, Select } from '@mui/material';
import { floatAsStringGenerator } from 'src/utils';

interface ABVSelectorProps {
  abvLimit: string;
  setAbvLimit: Dispatch<string>;
  minAbv: number;
  maxAbv: number;
}

/**
 * A dropdown <Form> component with an "unlimited" option as 0 and the passed options
 */
export default function ABVSelector(props: ABVSelectorProps): JSX.Element {
  const { abvLimit, setAbvLimit, minAbv, maxAbv } = props;
  const values = [...floatAsStringGenerator(Math.max(1, minAbv), maxAbv + 1)];
  return (
    <>
      <FormControl sx={{minWidth: 200, pb: 4}}>
        <InputLabel id="abv-limit">ABV Limit (Optional)</InputLabel>
        <Select
          label="ABV Limit (Optional)"
          labelId="abv-limit"
          value={abvLimit}
          onChange={(event) => setAbvLimit(`${event.target.value}` ?? '0')}
        >
          <MenuItem key={0} value={0}>unlimited</MenuItem>
          { values.map(value => <MenuItem key={value} value={value}>{value} %</MenuItem>) }
        </Select>
      </FormControl>
    </>
  );
}
