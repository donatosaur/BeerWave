import { Button } from '@mui/material';
import { Twitter } from '@mui/icons-material';

/**
 * A share button that opens a new window with a pre-filled tweet containing the passed message
 */
export function TwitterShareButton({ message }: {message: string}): JSX.Element {
  return (
    <Button
      variant="contained"
      endIcon={<Twitter />}
      onClick={() => {
        // build tweet template (see https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/)
        const to = encodeURI(`https://twitter.com/intent/tweet?text=${message}`);
        const [target, features] = ['_blank', 'noopener'];  // security (completely new window)
        window.open(to, target, features);
      }}
    >
      Share
    </Button>
  );
}
