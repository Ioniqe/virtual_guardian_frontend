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
  },
  patientsTableStyle: {
    margin: 150,
    marginLeft: 250,
    marginRight: 250,
    overflow: 'scroll',
  },
  addPatientButtonStyle: {
    position: 'absolute',
    marginBottom: '3vh',
    fontSize: 40,
    background: `linear-gradient(45deg, ${theme.palette.secondary.light} 10%, ${theme.palette.secondary.dark} 80%)`,
    color: theme.palette.primary.contrastText,
    borderRadius: 50,
    padding: '.5rem .5rem',
    transition: '0.3s',
    '&:hover': {
      backgroundPosition: 'right',
      padding: '.6rem .6rem',
      fontSize: 50,
    },
  },
  addPatientTooltipStyle: {
    marginLeft: '90vw',
  }
}));

export const useStylesPatientAppointments = makeStyles(theme => ({

}));

export const useStylesPatientTestForDisease = makeStyles(theme => ({
  titleStyle: {
    color: theme.palette.primary.contrastText,
    marginTop: '4em',
    position: 'relative',
  },
  subtitleStyle: {
    color: theme.palette.primary.main,
    paddingTop: '2vh',
    paddingBottom: '2vh',
    position: 'relative',
  },
  popupStyle: {
    '& .MuiDialog-paperWidthSm': {
      height: '60vh',

    },
    '& .MuiDialogTitle-root': {
      background: `linear-gradient(to right, ${theme.palette.secondary.light}, ${theme.palette.secondary.dark})`,
      height: '30vh'
    },
  },
  dialogContentTextStyle: {
    marginTop: '5vh',
    fontSize: 20,
  },
  dialogTitleStyle: {
    color: theme.palette.primary.contrastText,
    fontSize: 150,
    marginTop: '8vh'
  },
  paperStyle: {
    height: '80vh',
    width: '35vw',
    margin: 'auto',
    marginTop: '5vh',
    overflow: 'scrollable',
    '& .MuiTableContainer-root': {
      paddingTop: '30px',
      height: '60vh'
    }
  },
  table: {
    maxWidth: 600,
    marginLeft: '2vw',
    marginTop: '20px',
    overflow: 'scroll',
  },
  buttonStyle: {
    margin: 0,
    marginTop: '25px',
    padding: '.5rem 2rem',
    textTransform: 'uppercase',
    borderRadius: '1.6rem',
    border: 'none',
    cursor: 'pointer',
    color: theme.palette.primary.contrastText,
    right: 0,
    transition: '0.3s',
    backgroundImage: `linear-gradient(45deg, ${theme.palette.secondary.light} 10%, ${theme.palette.secondary.dark} 80%)`,
    backgroundSize: '300%',
    '&:hover': {
      backgroundPosition: 'right',
    },
  },
  cancelButtonStyle: {
    margin: 0,
    marginTop: '25px',
    padding: '.3rem 1rem',
    borderRadius: '1.6rem',
    border: 'none',
    cursor: 'pointer',
    color: theme.palette.primary.contrastText,
    fontSize: 13
  }

}));

