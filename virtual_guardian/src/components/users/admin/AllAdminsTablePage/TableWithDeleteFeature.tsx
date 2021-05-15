import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { User } from '../../../../model/models';
import AlertDialog from '../../../popups/Alert';

import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import EditIcon from "@material-ui/icons/EditOutlined";
import ListIcon from '@material-ui/icons/List';
import { TextField } from '@material-ui/core';
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";

interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  headers: string[]
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {props.headers.map((header, index) => (
          <TableCell
            key={index}
            align='center'
          >
            {header}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    title: {
      flex: '1 1 100%',
    },
  }),
);

interface EnhancedTableToolbarProps {
  numSelected: number;
  title: string
  handleDeleteSelectedUsers: () => void
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root,
      )}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          {props.title}
        </Typography>
      )}
      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={props.handleDeleteSelectedUsers}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

//TODO verify how it looks for more admins on a page
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      height: '50px important',
    },
    table: {
      minWidth: 750,
    },
  }),
);

let findUsersToBeDeleted = (userNames: string[], data: User[]): string[] => {
  let usersToBeDeleted: string[] = [];
  data.forEach(user => {
    userNames.includes(user.username) && usersToBeDeleted.push(user.id);
  });
  return usersToBeDeleted;
}

interface TableWithDeleteFeatureProps {
  data: User[],
  title: string,
  headers: string[],
  userType: string,
  deleteSelected: (adminsToBeDeleted: string[]) => void,
  assignCaregiver?: (userId: string) => void,
  displayDiseases?: (userId: string) => void,
  saveUser?: (editedUser: User) => void
}

export default function TableWithDeleteFeature({ data, title, headers, userType, deleteSelected, assignCaregiver, displayDiseases, saveUser }: TableWithDeleteFeatureProps) {
  const classes = useStyles();
  const [selected, setSelected] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState(false);

  const [rowEdited, setRowEdited] = React.useState(-1);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [address, setAddress] = React.useState('');

  const rowsPerPage = 10;

  let handleDeleteSelectedUsers = (): void => {
    setOpen(true);
  }

  let setDeleteAction = (): void => {
    let idsOfUsersToBeDeleted = findUsersToBeDeleted(selected, data);
    deleteSelected(idsOfUsersToBeDeleted);
    setSelected([]);
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.username);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length);

  let editUser = (index: number): void => {
    setRowEdited(index)
    setUsername(data[index].username)
    setPassword(data[index].password)
    setFirstname(data[index].firstname)
    setLastname(data[index].lastname)
    data[index].address && setAddress(data[index].address as string)
  }

  let onSaveEdited = (index: number) => {

    let editedUser = data[index]
    editedUser.username = username
    editedUser.password = password
    editedUser.firstname = firstname
    editedUser.lastname = lastname
    editedUser.address && (editedUser.address = address)

    saveUser && saveUser(editedUser)

    data[index] = editedUser

    setUsername('')
    setPassword('')
    setFirstname('')
    setLastname('')
    setAddress('')
    setRowEdited(-1)
  }

  let onRevert = (): void => {
    setUsername('')
    setPassword('')
    setFirstname('')
    setLastname('')
    setAddress('')
    setRowEdited(-1)
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} title={title} handleDeleteSelectedUsers={handleDeleteSelectedUsers} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={data.length}
              headers={headers}
            />
            <TableBody>
              {data.map((row, index) => {
                const isItemSelected = isSelected(row.username);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.username}
                  >
                    <TableCell padding="checkbox">
                      {rowEdited !== index &&
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          onClick={(event) => handleClick(event, row.username)}
                          aria-checked={isItemSelected}
                        />
                      }
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none" align="center">
                      {/* {row.username} */}
                      {
                        rowEdited === index ?
                          <TextField
                            id="username"
                            autoComplete='off'
                            value={username}
                            onChange={e => { setUsername(e.target.value) }}
                            style={{ width: '60%' }}
                          /> : row.username
                      }
                    </TableCell>
                    <TableCell align="center">
                      {/* {row.password} */}
                      {
                        rowEdited === index ?
                          <TextField
                            id="password"
                            autoComplete='off'
                            value={password}
                            onChange={e => { setPassword(e.target.value) }}
                            style={{ width: '60%' }}
                          /> : row.password
                      }
                    </TableCell>
                    <TableCell align="center">
                      {/* {row.firstname} */}
                      {
                        rowEdited === index ?
                          <TextField
                            id="firstname"
                            autoComplete='off'
                            value={firstname}
                            onChange={e => { setFirstname(e.target.value) }}
                            style={{ width: '60%' }}
                          /> : row.firstname
                      }
                    </TableCell>
                    <TableCell align="center">
                      {/* {row.lastname} */}
                      {
                        rowEdited === index ?
                          <TextField
                            id="lastname"
                            autoComplete='off'
                            value={lastname}
                            onChange={e => { setLastname(e.target.value) }}
                            style={{ width: '60%' }}
                          /> : row.lastname
                      }
                    </TableCell>
                    { row.address && <TableCell align="center">
                      {/* {row.address} */}
                      {
                        rowEdited === index ?
                          <TextField
                            id="address"
                            autoComplete='off'
                            value={address}
                            onChange={e => { setAddress(e.target.value) }}
                            style={{ width: '60%' }}
                          /> : row.address
                      }
                    </TableCell>}
                    <TableCell align="center">{row.birthday}</TableCell>
                    <TableCell align="center">{row.gender}</TableCell>
                    {
                      (userType === 'patient' && rowEdited !== index) &&
                      <TableCell align="center">
                        <Tooltip title="Assign Caregiver">
                          <IconButton aria-label="add_patient" onClick={() => (assignCaregiver && assignCaregiver(row.id))} >
                            <PersonAddRoundedIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    }
                    {
                      ((userType === 'patient' || userType === 'caregiver') && rowEdited !== index) &&
                      <TableCell align="center">
                        <Tooltip title="Edit">
                          <IconButton aria-label="edit" onClick={() => editUser(index)} >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    }
                    {
                      (userType === 'patient' && rowEdited !== index) &&
                      <TableCell align="center">
                        <Tooltip title="Diseases">
                          <IconButton aria-label="diseases" onClick={() => (displayDiseases && displayDiseases(row.id))} >
                            <ListIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    }
                    {
                      rowEdited === index &&
                      <>
                        <TableCell align="center">
                          <Tooltip title="Save">
                            <IconButton
                              aria-label="done"
                              onClick={() => onSaveEdited(index)}
                            >
                              <DoneIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Cancel">
                            <IconButton
                              aria-label="revert"
                              onClick={() => onRevert()}
                            >
                              <RevertIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </>
                    }
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <AlertDialog
        open={open}
        setOpen={setOpen}
        dialogTitle={'Are you sure you want to delete the selected users?'}
        dialogContentText={'The action cannot be undone.'}
        negativeMessage={'no'}
        positiveMessage={'yes'}
        setAction={setDeleteAction}
      />
    </div>
  );
}