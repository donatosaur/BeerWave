import { Box, IconButton } from '@mui/material';
import { CardContent } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material'

export interface CardNavigationProps {
  backButtonDisabled: boolean;
  nextButtonDisabled: boolean;
  onBackButtonClick: () => void;
  onNextButtonClick: () => void;
}

/**
 * CardContent component containing back and forward navigation buttons
 */
export function CardNavigation(props: CardNavigationProps): JSX.Element {
  const {
    backButtonDisabled,
    nextButtonDisabled,
    onBackButtonClick,
    onNextButtonClick
  } = props;

  return (
    <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
      <Box sx={{ flexGrow: 1, flexShrink: 1 }}>
        <IconButton 
          disabled={backButtonDisabled}
          onClick={onBackButtonClick}
        >
          <ChevronLeft />
        </IconButton>
      </Box>
      <Box>
        <IconButton
          disabled={nextButtonDisabled}
          onClick={onNextButtonClick}
        >
          <ChevronRight />
        </IconButton>
      </Box>
    </CardContent>
  );
}
