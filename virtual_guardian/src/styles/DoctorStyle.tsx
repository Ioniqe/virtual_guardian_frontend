import { makeStyles } from "@material-ui/core";

export const useStylesDoctorHome = makeStyles(theme => ({
  titleStyle: {
    color: theme.palette.primary.contrastText,
    marginTop: '1.5em',
    marginLeft: '7.7em',
  },
  subtitleStyle: {
    color: theme.palette.primary.dark,
    marginTop: '7.4em',
    letterSpacing: '3px',
    marginLeft: '22.5em',
  },

  basicButton: {
    marginTop: '32em',
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
}));