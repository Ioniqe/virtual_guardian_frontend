import { makeStyles } from "@material-ui/core";

export const useStylesAdmin = makeStyles(theme => ({
  adminsTableStyle: {
    margin: 150,
    marginLeft: 200,
    marginRight: 200,
    overflow: 'scroll',
    // '*::-webkit-scrollbar': {
    //   visibility: 'visible',
    //   width: '5px',
    //   scrollbarColor: 'red'
    // },
  }
}));