import { makeStyles } from "@material-ui/core";

export const useStylesCaregiver = makeStyles(theme => ({
  caregiversTableStyle: {
    marginTop: '8vh',
    marginLeft: 250,
    marginRight: 250,
    overflow: 'scroll',
    height: '75vh',
  },
  addCaregiverButtonStyle: {
    position: 'absolute',
    marginTop: '5vh',
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
  addCaregiverTooltipStyle: {
    marginLeft: '90vw',
  }
}));

export const useStylesActivityList = makeStyles(theme => ({
  tablePaperStyle: {
    minWidth: 650,
    maxWidth: 1300,
    margin: 'auto',
    marginTop: '7vh',
    height: '75vh',
    overflowY: 'scroll'
  },
  paper: {
    width: '100%',
    height: '80vh',
    overflow: 'scroll',
  },
  tableStyle: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  titleStyle: {
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 25,
    paddingBottom: 25,
  }
}));

export const useStylesLabelDays = makeStyles(theme => ({
  collapsibleTableStyle: {
    margin: 'auto',
    width: '85vw',
    marginTop: '3vh',
    height: '87vh',
    overflowY: 'scroll'
  },
  finishTooltipStyle: {
    marginRight: '2vw',
    marginTop: '-4vh',
    position: 'absolute',
    right: 0,
    fontSize: 80,
    cursor: 'pointer',
    background: `linear-gradient(45deg, ${theme.palette.secondary.light} 10%, ${theme.palette.secondary.dark} 80%)`,
    color: theme.palette.primary.contrastText,
    borderRadius: 50,
    padding: '1rem 1rem',
    transition: '0.3s',
    '&:hover': {
      backgroundPosition: 'right',
      padding: '1.5rem 1.5rem',
    },
  },
  finishButtonStyle: {
    width: 30,
    height: 30,
  },
}))

export const useStylesCaregiverHome = makeStyles(theme => ({
  titleStyle: {
    color: theme.palette.primary.contrastText,
    marginTop: '1.5em',
    marginLeft: '7em',
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