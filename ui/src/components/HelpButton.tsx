import { useState } from 'react';
import { Box, Button, Popover, Typography } from '@mui/material';
import { Help } from '@mui/icons-material';

type vertical = 'bottom' | 'top' | 'center';
type horizontal = 'left' | 'right' | 'center';

interface HelpButtonProps {
  verticalAnchor: vertical;
  horizontalAnchor: horizontal;
  helpText: string[];
}

/**
 * A toggle-able help button that renders a popover with the specified help text.
 */
export function HelpButton(props: HelpButtonProps): JSX.Element {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);  // to position popover
  const { verticalAnchor, horizontalAnchor, helpText } = props;

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
        open={!!anchor}
        anchorEl={anchor}
        anchorOrigin={{vertical: verticalAnchor, horizontal: horizontalAnchor}}
        onClose={() => setAnchor(null)}
      >
        <Box sx={{maxWidth: 400, height: 'auto', p: 1}}>
          {
            helpText.map((text, index) => (
              <Typography key={`help-text-${index}`} paragraph align="left" variant="caption">
                { text }
              </Typography>
            ))
          }
        </Box>
      </Popover>
    </>
  );
}
