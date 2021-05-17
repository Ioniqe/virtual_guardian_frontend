import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { ActivityList } from '../../../../model/models';
import { Checkbox } from '@material-ui/core';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

interface RowProps {
  day: ActivityList,
  isItemSelected: boolean,
  labelId: string,
  handleClick: (event: React.MouseEvent<unknown>, day: Date) => void,

}

function Row({ day, isItemSelected, labelId, handleClick }: RowProps) {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {day.day}
        </TableCell>
        <TableCell padding="checkbox">
          <Checkbox
            checked={isItemSelected}
            inputProps={{ 'aria-labelledby': labelId }}
            onClick={(event) => handleClick(event, day.day)}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Activities
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Day</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell align="right">End Time</TableCell>
                    <TableCell align="right">Activity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {day.activities.map((activity, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {activity.day}
                      </TableCell>
                      <TableCell>{activity.startTime}</TableCell>
                      <TableCell>{activity.endTime}</TableCell>
                      <TableCell align="right">{activity.activity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

interface CollapsibleTableProps {
  activitiesList: ActivityList[],
  selected: Date[],
  setSelected: (selected: Date[]) => void
}

export default function CollapsibleTable({ activitiesList, selected, setSelected }: CollapsibleTableProps) {

  const isSelected = (day: Date) => selected.indexOf(day) !== -1;

  const handleClick = (event: React.MouseEvent<unknown>, day: Date) => {
    const selectedIndex = selected.indexOf(day);
    let newSelected: Date[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, day);
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

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Day</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {
            activitiesList.map((day, index) => {
              const isItemSelected = isSelected(day.day);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <Row key={index} day={day} isItemSelected={isItemSelected} labelId={labelId} handleClick={handleClick} />
              );
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}