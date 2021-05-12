import { makeStyles } from "@material-ui/core";

export const useStylesNavbar = makeStyles(theme => ({
  navbarItems: {
    backgroundColor: `${theme.palette.primary.contrastText}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1.2rem',
    boxSizing: 'border-box',
    height: '6vh',

  },
  navbarTitle: {
    fontSize: '1rem !important',
    color: `${theme.palette.primary.dark}`,
    textTransform: 'uppercase',
    letterSpacing: '5px',
    marginLeft: '6em',
    cursor: 'pointer',
  },
  visibleStyle: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '40%',
    fontWeight: 'bold',
    fontSize: '1.5em',
    color: `${theme.palette.primary.dark}`,
    textDecoration: 'none',
    letterSpacing: '3px',
    listStyle: 'none',
    marginRight: '3em',
  },
  basicButton: {
    margin: 0,
    marginRight: '6em',
    padding: '.3rem 2rem',
    textTransform: 'uppercase',
    borderRadius: '1.1rem',
    border: `solid 2px ${theme.palette.primary.light}`,
    cursor: 'pointer',
    color: theme.palette.primary.light,
    transition: '0.6s',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
    },
  },
  specialButtonStyle: {
    margin: 3,
    color: `${theme.palette.primary.dark}`,
    textDecoration: 'none',
    textTransform: 'capitalize',
  },
  menuItemStyle: {
    width: '100%',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
  dropDownMenuStyle: {
    position: 'absolute',
    top: '6vh',
    width: '200px',
    backgroundColor: `${theme.palette.primary.contrastText}`,
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    padding: '1rem',
    overflow: 'hidden',
    transition: 'height 500ms ease',
    transform: 'translateX(-100%)',

  }

}));