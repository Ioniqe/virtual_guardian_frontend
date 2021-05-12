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
}

export default function TableWithDeleteFeature({ data, title, headers, userType, deleteSelected, assignCaregiver, displayDiseases }: TableWithDeleteFeatureProps) {
  const classes = useStyles();
  const [selected, setSelected] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState(false);

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
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                        onClick={(event) => handleClick(event, row.username)}
                        aria-checked={isItemSelected}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none" align="center">
                      {row.username}
                    </TableCell>
                    <TableCell align="center">{row.password}</TableCell>
                    <TableCell align="center">{row.firstname}</TableCell>
                    <TableCell align="center">{row.lastname}</TableCell>
                    { row.address && <TableCell align="center">{row.address}</TableCell>}
                    <TableCell align="center">{row.birthday}</TableCell>
                    <TableCell align="center">{row.gender}</TableCell>
                    {
                      userType === 'patient' &&
                      <TableCell align="center">
                        <Tooltip title="Assign Caregiver">
                          <IconButton aria-label="add_patient" onClick={() => (assignCaregiver && assignCaregiver(row.id))} >
                            <PersonAddRoundedIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    }
                    {
                      (userType === 'patient' || userType === 'caregiver') &&
                      <TableCell align="center">
                        <Tooltip title="Edit">
                          <IconButton aria-label="edit" onClick={() => (assignCaregiver && assignCaregiver(row.id))} >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    }
                    {
                      (userType === 'patient' || userType === 'caregiver') &&
                      <TableCell align="center">
                        <Tooltip title="Diseases">
                          <IconButton aria-label="diseases" onClick={() => (displayDiseases && displayDiseases(row.id))} >
                            <ListIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
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