import { Alert, AlertTitle } from '@mui/material';


interface ErrorAlertProps {
  onClose: () => void;
  title?: string;
  errorMessage: string;
}

/**
 * A closeable alert element with an optional title component
 */
export function ErrorAlert(props: ErrorAlertProps): JSX.Element {
  const { onClose, errorMessage, title} = props;

  return (
    <Alert severity="error" onClose={onClose}>
      { !!title && <AlertTitle>{title}</AlertTitle> }
      { errorMessage }
    </Alert>
  );
}
