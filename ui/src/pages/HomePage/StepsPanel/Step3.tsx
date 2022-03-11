import type { Dispatch } from 'react';
import { 
  Box,
  Chip,
  Typography,
  InputLabel,
  FormControl,
  Stack,
  Select,
  MenuItem, 
} from '@mui/material';
import { defaultSxProps } from 'src/theme';


interface Step3Props {
  setSelectedStyles: Dispatch<string[]>;
  setSelectedFlavors: Dispatch<string[]>;
  setAbvLimit: Dispatch<number>;
  selectedStyles: string[];
  selectedFlavors: string[];
  abvLimit: number;
}


/**
 * Step that prompts users to confirm selections
 */
export default function Step3(props: Step3Props): JSX.Element {
  const {
    setSelectedStyles,
    setSelectedFlavors,
    setAbvLimit,
    selectedStyles,
    selectedFlavors,
    abvLimit,
  } = props;

  
  return (
    <>
      <Box sx={defaultSxProps.get('box')}>
        <Typography variant= "h6" sx={defaultSxProps.get('stepTypography')}>
          <strong>(Optional)</strong> Select a maximum ABV:
        </Typography>
        <FormControl sx={{minWidth: 200, pb: 4}}>
          <InputLabel id='abv-limit'>ABV Limit (Optional)</InputLabel>
          <Select
            label='ABV Limit (Optional)'
            labelId='abv-limit'
            value={abvLimit}
            onChange={(event) => setAbvLimit(Number.parseFloat(`${event.target.value}`) || 0)}
          >
            <MenuItem value={0}>unlimited</MenuItem>
            <MenuItem value={4.0}>4.0 %</MenuItem>
            <MenuItem value={5.0}>5.0 %</MenuItem>
            <MenuItem value={6.0}>6.0 %</MenuItem>
            <MenuItem value={7.0}>7.0 %</MenuItem>
            <MenuItem value={8.0}>8.0 %</MenuItem>
            <MenuItem value={9.0}>9.0 %</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{pb: 2}}>
          <Typography variant= "h6" sx={defaultSxProps.get('stepTypography')} paragraph>Verify your selections:</Typography>

          <Stack direction="row" spacing={2} sx={defaultSxProps.get('stepStack')}>
            <Typography variant="body1" sx={{me: 1, pt: 1}} >Styles:</Typography>
            {
              selectedStyles.map((style) => (
                <Chip
                  key={style}
                  label={style}
                  onDelete={selectedStyles.length > 1
                    ? () => setSelectedStyles(selectedStyles.filter((value) => style !== value))
                    : undefined  // not passing a function removes the delete icon
                  }
                />
              ))
            }
          </Stack>

          <Stack direction="row" spacing={2} sx={defaultSxProps.get('stepStack')}>
            <Typography variant="body1" sx={{me: 1, pt: 1}}>Flavors:</Typography>
            {
              selectedFlavors.map((flavor) => (
                <Chip
                  key={flavor}
                  label={flavor}
                  onDelete={selectedFlavors.length > 1 
                    ? () => setSelectedFlavors(selectedFlavors.filter((value) => flavor !== value))
                    : undefined  // not passing a function removes the delete icon
                  }
                />
              ))
            }
          </Stack>
        </Box>
      </Box>
    </>
  );
}

