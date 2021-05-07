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
        display: 'none',
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
