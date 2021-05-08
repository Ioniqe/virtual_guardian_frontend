import { makeStyles } from "@material-ui/core";

export const useSignUpStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
  },
  textField: {
    textAlign: 'left',
    color: theme.palette.primary.main,
    '& .MuiInputBase-input': {
      textAlign: 'left',
      color: theme.palette.primary.main,
    },
  },
  notchedOutline: {
    borderWidth: '2px',
    borderColor: `${theme.palette.primary.main} !important`,
    color: theme.palette.primary.main,
  },
  formControl: {
    color: theme.palette.primary.main,
    "& .MuiOutlinedInput-input": {
      color: theme.palette.primary.main,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.primary.main,
        borderWidth: '2px',
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
        borderWidth: '2px'
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
        borderWidth: '2px'
      },
    },
  },
  text: {
    color: theme.palette.primary.main,
    "& .MuiOutlinedInput-input": {
      color: theme.palette.primary.main,
    },
  },
  textDoctor: {
    color: theme.palette.primary.main,
  },
  loginButton: {
    width: '15%',
    fontFamily: 'Arial',
    fontSize: '0.9rem',
    padding: '.3rem 1.5rem',
    textTransform: 'uppercase',
    borderRadius: '1rem',
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
}));