import { makeStyles } from "@material-ui/core";

export const useStylesCaregiver = makeStyles(theme => ({
  caregiversTableStyle: {
    margin: 150,
    marginLeft: 250,
    marginRight: 250,
    overflow: 'scroll',
  },
  addCaregiverButtonStyle: {
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
  addCaregiverTooltipStyle: {
    marginLeft: '90vw',
  }
}));

export const useStylesActivityList = makeStyles(theme => ({
  tablePaperStyle: {
    minWidth: 650,
    maxWidth: 1300,
    margin: 'auto',
    marginTop: 150,
    
  },
  paper: {
    width: '100%',
    height: '600px',
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