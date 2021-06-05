import { Box, Collapse, IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import React from "react";
import { ActivityList, Day } from "../../../../model/models";
import { useStylesActivityList } from "../../../../styles/CaregiverStyle";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

interface RowProps {
  day: ActivityList,
  result: string,
}

function Row({ day, result }: RowProps) {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell align='center'>
          <h3> {day.day} </h3>
        </TableCell>
        <TableCell align='center'>
          {
            result === 'anomalous' ?
              <h3 style={{ color: 'red' }}>{result}</h3> :
              <h3>{result}</h3>
          }
        </TableCell>
        <TableCell align='center'>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Day</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell>End Time</TableCell>
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

interface PatientActivitiesDumbProps {
  days: Day[]
}

function PatientActivitiesDumb({ days }: PatientActivitiesDumbProps) {
  let style = useStylesActivityList();

  return (
    <>
      <Paper elevation={0} className={style.tablePaperStyle}>
        <Paper className={style.paper}>
          <TableContainer>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell align='center'><h3>Day</h3></TableCell>
                  <TableCell align='center'><h3>Result</h3></TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  days.sort((a, b) => { return (a.day < b.day ? 1 : -1) }).map((day, index) => {
                    return (
                      <Row key={index} day={day} result={day.result} />
                    );
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Paper>
    </>
  );
}

export default PatientActivitiesDumb;