import { makeStyles } from "@material-ui/core";

export const useStylesNavbar = makeStyles(theme => ({
  navbarItems: {
    backgroundColor: `${theme.palette.primary.dark}`,
    height: '70px',
    display: 'flex',
    justifyContent: 'space-between', 
    // justifyContent: 'space-around', 
    alignItems: 'center',
    fontSize: '1.2rem',
    boxSizing: 'border-box',
    // minHeight: '8vh',
  },
  ulStyle: {
    margin: 0,
  },
  navbarTitle: {
    fontSize: '1rem !important',
    color: `${theme.palette.primary.contrastText}`,
    textTransform: 'uppercase',
    letterSpacing: '5px',
    marginLeft: '6em',
  },
  iconButtonStyle: {
    color: theme.palette.primary.contrastText,
  },
  visibleStyle: {
    display: 'flex',
    justifyContent: 'space-around', 
    width: '40%',
    color: `${theme.palette.primary.contrastText}`,
    textDecoration: 'none',
    letterSpacing: '3px',
    listStyle: 'none',
    marginRight: '3em',
  },
  invisibleStyle: {
    textDecoration: 'none',
    listStyle: 'none',
  },
  hyperlinkStyle: {
    color: `${theme.palette.primary.contrastText}`,
    textDecoration: 'none',
  },
  burgerStyle: {
    display: 'none',
  },
  burgerLine1Style: {
    width: '25px',
    height: '2px',
    backgroundColor: `${theme.palette.primary.contrastText}`,
    margin: '5px'
  },
  burgerLine2Style: {
    width: '25px',
    height: '2px',
    backgroundColor: `${theme.palette.primary.contrastText}`,
    margin: '5px'
  },
  burgerLine3Style: {
    width: '25px',
    height: '2px',
    backgroundColor: `${theme.palette.primary.contrastText}`,
    margin: '5px'
  },


}));