import { makeStyles } from "@material-ui/core";

export const useStylesAdmin = makeStyles(theme => ({
  adminsTableStyle: {
    margin: 150,
    marginLeft: 200,
    marginRight: 200,
    maxHeight: '85%',
    overflow: 'scroll',
  },
  titleStyle: {
    position: 'relative',
    color: theme.palette.primary.contrastText,
    paddingTop: '1.5em',
    marginTop: 0,
  },
  subtitleStyle: {
    position: 'relative',
    color: theme.palette.primary.contrastText,
    letterSpacing: '3px',
    // marginLeft: '22.5em',
    marginTop: 0,
  },
  basicButton: {
    marginTop: '10em',
    fontFamily: 'Arial',
    fontSize: '1rem',
    padding: '.3rem 2rem',
    textTransform: 'uppercase',
    borderRadius: '1.1rem',
    cursor: 'pointer',
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.primary.light,
    transition: '0.6s',
    '&:hover': {
      padding: '0.8rem 3rem',
      borderRadius: '2rem',
      color: theme.palette.primary.light,
      backgroundColor: theme.palette.primary.contrastText,
    },
  },
}));

export const useStylesAdminExperimentsPage = makeStyles(theme => ({
  adminsTableStyle: {
    margin: 50,
    marginLeft: 200,
    marginRight: 200,
    height: '85%',
  },
  topElementsStyle: {
    paddingTop: '1.5em',
  },
  textField: {
    textAlign: 'left',
    color: theme.palette.primary.main,
    '& .MuiInputBase-input': {
      textAlign: 'left !important',
    },
  },
  topButtonsStyle: {
    display: 'flex',
    paddingLeft: '4vw',

  },
  formsStyle: {
    float: 'left',
    // width: '80%',
    width: '50%',
    // marginLeft: '-14em',
  },
  formControlStyle: {
    width: '40%',
    marginRight: '2%',
  },
  buttonStyle: {
    marginTop: '0.5vh',
    float: 'right',
    width: '40%',
    fontFamily: 'Arial',
    fontSize: '1rem',
    padding: '.3rem .7rem',
    textTransform: 'uppercase',
    borderRadius: '1.1rem',
    border: `solid 3.5px ${theme.palette.primary.contrastText}`,
    cursor: 'pointer',
    color: theme.palette.primary.contrastText,
    backgroundSize: '200%',
    transition: '0.6s',
    backgroundImage: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    '&:hover': {
      backgroundPosition: 'right'
    },
  },
  trainButtonStyle: {
    marginRight: '1vw',
  },
  setDefaultButtonStyle: {
    marginTop: '1em',
    width: '40%',
    fontFamily: 'Arial',
    fontSize: '1rem',
    padding: '.3rem .7rem',
    textTransform: 'uppercase',
    borderRadius: '1.1rem',
    border: `solid 3.5px ${theme.palette.primary.contrastText}`,
    cursor: 'pointer',
    color: theme.palette.primary.contrastText,
    backgroundSize: '200%',
    transition: '0.6s',
    backgroundImage: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    '&:hover': {
      backgroundPosition: 'right'
    },
  },
  leftElementsStyle: {
    marginTop: '2%',
    marginLeft: '3%',
    width: '45%',
    float: 'left',
    height: '85%',
    overflowY: 'scroll',
  },
  rightSideStyle: {
    marginTop: '1%',
    marginRight: '2%',
    width: '45%',
    float: 'right',
    height: '78%',
  },
  resultsTableStyle: {
    display: 'grid',
    marginTop: '2vh',
    height: '82%',
    overflowX: 'clip',
    overflowY: 'scroll',
  },
  resultsPaperStyle: {
    backgroundColor: 'red',
  },
  rightElementsStyle: {
    float: 'right',
    width: '45%'
  }
}));