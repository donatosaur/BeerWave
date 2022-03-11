import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText
} from '@mui/material';


interface StartOverDialogProps {
  open: boolean;
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
  onConfirm: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * Modal with a "Start over?" prompt
 */
export function StartOverDialog(props: StartOverDialogProps): JSX.Element {
  const { open, onCancel, onConfirm } = props;

  return (
    <Dialog maxWidth="xs" open={open} onClose={onCancel}>
      <DialogTitle>Start over?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Starting over will erase all your recommendations.
        </DialogContentText>
        <DialogActions>
          <Button variant="text" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="text" onClick={onConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
