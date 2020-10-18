import React from 'react';
import { AppBar, Toolbar, Typography, useMediaQuery,
  ThemeProvider, createMuiTheme } from '@material-ui/core'
import ToneInputs from './ToneInputs'

function App() {
  const darkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const autoTheme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light'
    }
  })
  return (
    <ThemeProvider theme={autoTheme}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">TET</Typography>
        </Toolbar>
      </AppBar>
      <ToneInputs/>
    </ThemeProvider>
  );
}

export default App;
