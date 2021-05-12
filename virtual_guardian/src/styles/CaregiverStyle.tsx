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