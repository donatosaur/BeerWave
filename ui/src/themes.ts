import { createTheme, Theme, SxProps } from '@mui/material';
import { indigo, purple } from '@mui/material/colors';

export const siteTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: indigo[700],
    },
    secondary: {
      main: purple[200],
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          
        }
      }
    }
  },

});


// declare default sx props for MUI elements ...

const container: SxProps = {
  p: 1,
}

const box: SxProps = {
  p: 1,
}

const stepper: SxProps = {
  p: 1,
  alignItems: 'center',
}


// ... and make them efficiently accessible
export const defaultSxProps = new Map<string, SxProps>([
  ['container', container],
  ['box', box],
  ['stepper', stepper],
]);
