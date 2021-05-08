import { makeStyles } from "@material-ui/core";

export const useStylesNavbar = makeStyles(theme => ({
  navbarItems: {
    backgroundColor: `${theme.palette.primary.dark}`,
    // height: '70px',
    display: 'flex',
    justifyContent: 'space-between',
    // justifyContent: 'space-around', 
    alignItems: 'center',
    fontSize: '1.2rem',
    boxSizing: 'border-box',
    minHeight: '8vh',

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

    // ["@media (max-width: 1500px)"]: {
    //   width: '50%',
    //   marginRight: 0,
    // },

    // ["@media (max-width: 1200px)"]: {
    //   width: '80% !impoertant',
    //   marginRight: 0,
    // },

    // ["@media (max-width:850px)"]: {
    //   position: 'absolute',
    //   right: 0,
    //   height: '92vh',
    //   top: '8vh',
    //   backgroundColor: `${theme.palette.primary.light}`,
    //   width: '45%',
    //   display: 'flex',
    //   flexDirection: 'column',
    //   alignItems: 'center',
    //   transform: 'translateX(100%)',
    //   overflowX: 'hidden !important'

    // },
  },
  invisibleStyle: {
    textDecoration: 'none',
    listStyle: 'none',
  },
  hyperlinkStyle: {
    color: `${theme.palette.primary.contrastText}`,
    textDecoration: 'none',
    transition: '0.6s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
    '&:hover': {
      // textShadow: `0 0 0 ${theme.palette.primary.dark}, 0 0 5px`,
      // textDecoration: 'underline'
      border: `solid 3px ${theme.palette.primary.contrastText}`,
      borderRadius: '1.1rem',
      textTransform: 'uppercase',
      padding: '.2rem 1.5rem',
      
      backgroundColor: theme.palette.primary.contrastText,
      color: theme.palette.primary.main,
    },
  },
  // burgerStyle: {
  //   display: 'none',
  // },
  // burgerLine1Style: {
  //   width: '25px',
  //   height: '2px',
  //   backgroundColor: `${theme.palette.primary.contrastText}`,
  //   margin: '5px'
  // },
  // burgerLine2Style: {
  //   width: '25px',
  //   height: '2px',
  //   backgroundColor: `${theme.palette.primary.contrastText}`,
  //   margin: '5px'
  // },
  // burgerLine3Style: {
  //   width: '25px',
  //   height: '2px',
  //   backgroundColor: `${theme.palette.primary.contrastText}`,
  //   margin: '5px'
  // },
  basicButton: {
    margin: 0,
    marginRight: '6em',
    padding: '.2rem 2rem',
    textTransform: 'uppercase',
    borderRadius: '1.1rem',
    border: `solid 3.5px ${theme.palette.primary.contrastText}`,
    cursor: 'pointer',
    color: theme.palette.primary.contrastText,
    // backgroundSize: '200%',
    transition: '0.6s',
    '&:hover': {
      backgroundColor: theme.palette.primary.contrastText,
      color: theme.palette.primary.main,
    },
  },

}));