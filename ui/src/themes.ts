import { createTheme, Theme } from '@mui/material';
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
