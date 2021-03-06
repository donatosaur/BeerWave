import type { SxProps, Theme } from '@mui/material';
import { createTheme } from '@mui/material';
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
    MuiButtonBase: {
      defaultProps: {
        disableTouchRipple: true,
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          alignSelf: 'center',
        }
      }
    }
  },

});


// Default sx props for MUI elements

const container: SxProps = {
  p: 1,
}

const box: SxProps = {
  p: 1,
}

const bordered: SxProps = {
  border: 0,
  borderRadius: 1,
  boxShadow: 5,
}

const footer: SxProps = {
  top: 'auto',  // anchor to bottom of flexbox
  bottom: 0,
  p: 2,
  textAlign: 'center',
}


const stepTypography: SxProps = { 
  my: 2,
  mx: 0.5,
}


const selectorBox: SxProps = {
  mt: 3,
  mb: 2,
}


export const defaultSxProps = new Map<string, SxProps>([
  ['container', container],
  ['bordered', bordered],
  ['box', box],
  ['footer', footer],
  ['stepTypography', stepTypography],
  ['selectorBox', selectorBox],
]);
