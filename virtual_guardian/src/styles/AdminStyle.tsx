import { makeStyles } from "@material-ui/core";

export const useStylesAdmin = makeStyles(theme => ({
  adminsTableStyle: {
    margin: 150,
    marginLeft: 200,
    marginRight: 200,
    maxHeight: '85%',
    overflow: 'scroll',
  },
}));

export const useStylesAdminExperimentsPage = makeStyles(theme => ({
  adminsTableStyle: {
    margin: 50,
    marginLeft: 200,
    marginRight: 200,
    height: '85%',
  },
  textField: {
    textAlign: 'left',
    color: theme.palette.primary.main,
    '& .MuiInputBase-input': {
      textAlign: 'left !important',
    },
  },
  formsStyle: {
    marginTop: '.5em',
    float: 'left',
    width: '80%',
    marginLeft: '-14em',
  },
  formControlStyle: {
    width: '20%',
    marginRight: '2%',

  },
  predictButtonStyle: {
    float: 'right',
    marginTop: '1em',
    marginRight: '18em',
    width: '13%',
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
  collapsibleTableStyle: {
    marginTop: '3%',
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
    marginTop: '1%',
    marginRight: '3%',
    width: '45%',
    float: 'right',
    height: '83%',
    overflowX: 'clip',
    overflowY: 'scroll',
  },
  resultsPaperStyle: {
    backgroundColor: 'red',
  },

}));