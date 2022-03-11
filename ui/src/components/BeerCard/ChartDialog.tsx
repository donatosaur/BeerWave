import type { Dispatch } from 'react';
import type { PlotValues } from 'src/utils';
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import ChartCardMedia from './ChartCardMedia';

interface ChartDialogProps {
  data: PlotValues[];
  chartOpen: boolean;
  setChartOpen: Dispatch<boolean>;
}

/**
 * Modal containing a pie chart representing the passed data
 */
export default function ChartDialog({ data, chartOpen, setChartOpen }: ChartDialogProps): JSX.Element {
  return (
    <Dialog maxWidth="md" open={chartOpen} onClose={() => setChartOpen(false)}>
      <DialogTitle>Summary</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Card variant="outlined" sx={{width: 500, height: 400}}>
            <ChartCardMedia 
              title="Flavor Matches Among All Beers Searched"
              values={data}
              width="500"
              height="400"
            />
          </Card>
        </DialogContentText>
        <DialogActions>
          <Button variant="text" onClick={() => setChartOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
