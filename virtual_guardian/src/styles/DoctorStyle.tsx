import { makeStyles } from "@material-ui/core";

export const useStylesDoctorHome = makeStyles(theme => ({
  titleStyle: {
    position: 'relative',
    color: theme.palette.primary.contrastText,
    paddingTop: '1.5em',
    marginTop: 0,
    // marginLeft: '7em',
  },
  subtitleStyle: {
    color: theme.palette.primary.dark,
    letterSpacing: '3px',
    marginLeft: '22.5em',
    marginTop: 0,
  },
  basicButton: {
    marginTop: '18em',
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