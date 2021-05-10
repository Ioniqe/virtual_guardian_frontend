import { makeStyles } from "@material-ui/core";

export const useStylesPatient = makeStyles(theme => ({
  basicButton: {
    marginTop: '32em',
    // marginRight: '15em',
    fontFamily: 'Arial',
    fontSize: '1rem',
    padding: '.3rem 2rem',
    textTransform: 'uppercase',
    borderRadius: '1.1rem',
    cursor: 'pointer',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    transition: '0.6s',
    '&:hover': {
      padding: '0.8rem 3rem',
      borderRadius: '2rem',
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.dark,
    },
  },
  emergencyButton: {
    margin: 0,
    marginRight: '1.5rem',
    padding: '1rem 3rem',
    textTransform: 'uppercase',
    borderRadius: '1.6rem',
    border: 'none',
    cursor: 'pointer',
    color: theme.palette.primary.contrastText,
    position: 'absolute',
    right: 0,
    top: '8vh',
    transition: '0.3s',
    backgroundImage: `linear-gradient(45deg, ${theme.palette.secondary.light} 10%, ${theme.palette.secondary.dark} 80%)`,
    backgroundSize: '200%',
    '&:hover': {
      backgroundPosition: 'right',
      padding: '2rem 5rem',
      borderRadius: '5rem',
    },
  },
  specialButtonStyle: {
    margin: 3,
    color: `${theme.palette.primary.dark}`,
    textDecoration: 'none',
    textTransform: 'capitalize',
  },
  titleStyle: {
    color: theme.palette.primary.contrastText,
    marginTop: '1.5em',
    marginLeft: '7.5em',
  },
  subtitleStyle: {
    color: theme.palette.primary.dark,
    marginTop: '7.4em',
    letterSpacing: '3px',
    marginLeft: '23.2em',
  },
  detailsStyle: {
    color: theme.palette.primary.dark,
    marginLeft: 0,
  }


}));