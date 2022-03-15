import type { Dispatch } from 'react';
import { Chip, Stack, Typography } from '@mui/material';

interface StepStackProps {
  label: string;
  selections: string[];
  setSelections: Dispatch<string[]>;
}

/**
 * A horizontal <Stack> component containing the passed selections
 */
export default function StepStack(props: StepStackProps): JSX.Element {
  const { label, selections, setSelections } = props;

  // closure
  const deleteSelection = (currentSelection: string) => () => {
    setSelections(selections.filter((value) => currentSelection !== value));
  }

  return (
    <Stack direction="row" spacing={2} sx={{m: 1, p: 1}}>
      <Typography variant="body1" sx={{me: 1, pt: 1}}>{label}</Typography>
      {
        selections.map((selection) => (
          <Chip
            key={selection}
            label={selection}
            // passing undefined to onDelete removes the clear icon
            onDelete={ selections.length > 1 ? deleteSelection(selection) : undefined }
          />
        ))
      }
    </Stack>
  );
}
