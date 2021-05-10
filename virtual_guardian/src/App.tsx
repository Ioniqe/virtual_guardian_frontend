import React from 'react';
import './App.css';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import Main from './components/Main';
import { Provider } from 'react-redux';
import store from './redux/store';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#00ACC1',
      main: '#2A73BC',
      dark: '#513EB7',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#f79d65',
      main: '#f4845f',
      dark: '#f25c54', //or #f27059
      contrastText: '#f7b267',
    },
  }
});

const useStyles = makeStyles(theme => (
  {
    root: {
      height: "100vh",
      background: "linear-gradient(to right, #513EB7, #00ACC1)",
    },
    '@global': { // remove / hide scrollbar
      '*::-webkit-scrollbar': {
        // display: 'none',
        visibility: 'hidden',
        width:0,
      },
    },
  }
));

function App() {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <Main />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
