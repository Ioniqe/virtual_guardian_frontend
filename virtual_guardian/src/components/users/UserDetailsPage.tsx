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
      <Table className={classes.table}>
        <TableBody>

          <TableRow key='firstname'>
            <TableCell>First Name</TableCell>
            <TableCell align="right">{loggedUser.firstname}</TableCell>
          </TableRow>

          <TableRow key='lastname'>
            <TableCell>Last Name</TableCell>
            <TableCell align="right">{loggedUser.lastname}</TableCell>
          </TableRow>

          <TableRow key='username'>
            <TableCell>Username</TableCell>
            <TableCell align="right">{loggedUser.username}</TableCell>
          </TableRow>

          <TableRow key='password'>
            <TableCell>Password</TableCell>
            <TableCell align="right">{loggedUser.password}</TableCell>
          </TableRow>

          <TableRow key='birthday'>
            <TableCell>Birthday</TableCell>
            <TableCell align="right">{loggedUser.birthday}</TableCell>
          </TableRow>

          {
            loggedUser.type === 'patient' &&
            <TableRow key='address'>
              <TableCell>Address</TableCell>
              <TableCell align="right">{loggedUser.address}</TableCell>
            </TableRow>
          }

          <TableRow key='gender'>
            <TableCell>Gender</TableCell>
            <TableCell align="right">{loggedUser.gender}</TableCell>
          </TableRow>


        </TableBody>
      </Table>
    </TableContainer>
  );
}


export default UserDetailsPage;