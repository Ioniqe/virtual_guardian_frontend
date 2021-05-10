import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { User } from '../../model/models';

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});


interface UserDetailsPageProps {
  loggedUser: User
}

function UserDetailsPage({ loggedUser }: UserDetailsPageProps) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>

          <TableRow key='firstname'>
            <TableCell component="th" scope="row">First Name</TableCell>
            <TableCell component="th" scope="row" align="right">{loggedUser.firstname}</TableCell>
          </TableRow>

          <TableRow key='lastname'>
            <TableCell component="th" scope="row">Last Name</TableCell>
            <TableCell component="th" scope="row" align="right">{loggedUser.lastname}</TableCell>
          </TableRow>

          <TableRow key='username'>
            <TableCell component="th" scope="row">Username</TableCell>
            <TableCell component="th" scope="row" align="right">{loggedUser.username}</TableCell>
          </TableRow>

          <TableRow key='password'>
            <TableCell component="th" scope="row">Password</TableCell>
            <TableCell component="th" scope="row" align="right">{loggedUser.password}</TableCell>
          </TableRow>

          <TableRow key='birthday'>
            <TableCell component="th" scope="row">Birthday</TableCell>
            <TableCell component="th" scope="row" align="right">{loggedUser.birthday}</TableCell>
          </TableRow>

          {
            loggedUser.type === 'patient' &&
            <TableRow key='address'>
              <TableCell component="th" scope="row">Address</TableCell>
              <TableCell component="th" scope="row" align="right">{loggedUser.address}</TableCell>
            </TableRow>
          }

          <TableRow key='gender'>
            <TableCell component="th" scope="row">Gender</TableCell>
            <TableCell component="th" scope="row" align="right">{loggedUser.gender}</TableCell>
          </TableRow>


        </TableBody>
      </Table>
    </TableContainer>
  );
}


export default UserDetailsPage;