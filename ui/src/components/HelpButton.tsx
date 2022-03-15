import { useState } from 'react';
import { Box, Button, Popover } from '@mui/material';
import { Help } from '@mui/icons-material';

type vertical = 'bottom' | 'top' | 'center';
type horizontal = 'left' | 'right' | 'center';

interface HelpButtonProps {
  verticalAnchor: vertical;
  horizontalAnchor: horizontal;
  helpTextElement: JSX.Element;
}

/**
 * A toggle-able help button that renders a popover with the specified help text.
 */
export function HelpButton(props: HelpButtonProps): JSX.Element {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);  // to position popover
  const { verticalAnchor, horizontalAnchor, helpTextElement } = props;

  return (
    <>
      <Button
        variant="contained"
        size="small"
        endIcon={<Help />} 
        onClick={(event) => setAnchor(event.currentTarget)}
      >
        Help
      </Button>
      <Popover
        sx={{mt: 0.5}}
        open={!!anchor}
        anchorEl={anchor}
        anchorOrigin={{vertical: verticalAnchor, horizontal: horizontalAnchor}}
        onClose={() => setAnchor(null)}
      >
        <Box sx={{maxWidth: 425, height: 'auto', p: 1}}>
          { helpTextElement }
        </Box>
      </Popover>
    </>
  );
}
