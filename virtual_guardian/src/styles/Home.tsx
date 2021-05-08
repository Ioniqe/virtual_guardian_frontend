import { makeStyles } from "@material-ui/core";

export const useStylesHome = makeStyles(theme => ({
  title: {
    fontWeight: 380,
    letterSpacing: '2px',
    color: 'white',
  },
  basicButton: {
    marginTop: '1.4em',
    width: '8%',
    fontFamily: 'Arial',
    fontSize: '1rem',
    padding: '.3rem 2rem',
    textTransform: 'uppercase',
    borderRadius: '1.1rem',
    border: `solid 3.5px ${theme.palette.primary.contrastText}`,
    cursor: 'pointer',
    color: theme.palette.primary.contrastText,
    backgroundSize: '200%',
    transition: '0.6s',
    '&:hover': {
      backgroundColor: theme.palette.primary.contrastText,
      color: theme.palette.primary.main,
    },
  },
  content: {
    paddingTop: '19%',
  },
  header: {
    position: 'relative',
    textAlign: 'center',
  },
  waves: {
    marginTop: '13%',
    position: 'relative',
    width: '100%',
    height: '15vh',
    marginBottom: '-7px',
    minHeight: '100px',
    maxHeight: '150px'
  },
  rectangle: {
    width: '100%',
    height: '900px',
    background: 'white',
  },
  loginTitle: {
    paddingTop: '23%',
    fontWeight: 380,
    fontSize: '1.6em',
    letterSpacing: '2px',
    color: theme.palette.primary.main,
  },
  form: {
    paddingLeft: '41.5%',
    display: 'grid',
    paddingTop: '1%',
  },
  text: {
    width: '30%',
    textAlign: 'left',
    "& .MuiOutlinedInput-input": {
      color: theme.palette.primary.main,
      textAlign: 'left',
    },
  },
  textField: {
    color: theme.palette.primary.main,
    '& .MuiInputBase-input': {
      color: theme.palette.primary.main,
      textAlign: 'left !important',
    },
  },
  notchedOutline: {
    borderWidth: '2px',
    borderColor: `${theme.palette.primary.main} !important`,
    color: theme.palette.primary.main,
  },
  loginButton: {
    marginTop: '1.4em',
    width: '15%',
    marginLeft:'7%',
    fontFamily: 'Arial',
    fontSize: '1rem',
    padding: '.3rem 1.5rem',
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
  link: {
    marginBottom: '-20%',
    width: '30%',
    color: theme.palette.primary.main
  },
}));