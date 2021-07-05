import { Box, Collapse, createStyles, IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Typography } from "@material-ui/core";
import React from "react";
import { ActivityList, Emergency } from "../../../../model/models";
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
}

function Row({ day }: RowProps) {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell align='center'>
          {day.day}
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
              <Typography variant="h6" gutterBottom component="div">
                Activities
              </Typography>
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      height: '70vh',
      display: 'flex'
    },
    table: {
      minWidth: 750,
    },
  }),
);

interface AbnormalBehaviourDumbProps {
  anomalyList: ActivityList[],
  emergencyList: Emergency[],
}

function AbnormalBehaviourDumb({ anomalyList, emergencyList }: AbnormalBehaviourDumbProps) {
  const classes = useStyles();

  return (
    <div style={{ margin: 'auto', width: '70%', marginTop: '10vh' }}>
      <Paper className={classes.paper}>
        <div style={{width: '50vw'}}>
          <h1 style={{ marginTop: 0, paddingTop: '3vh' }}>Emergencies</h1>
          <TableContainer style={{height: '60vh', overflowY: 'scroll'}}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Patient</TableCell>
                  <TableCell align="center">Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  emergencyList.map((row, index) => { //.sort((a, b) => { return (a.date < b.date ? -1 : 1) })
                    let date = new Date(row.date)

                    return (
                      <TableRow key={index}>
                        <TableCell align="center">
                          {row.patientName}
                        </TableCell>

                        <TableCell align="center">
                          {date.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div style={{width: '50vw'}}>
          <h1 style={{ marginTop: 0, paddingTop: '3vh' }}>Anomalies</h1>
          <TableContainer style={{height: '60vh', overflowY: 'scroll'}}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Day</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody style={{overflowY: 'scroll'}}>
                {
                  anomalyList.map((day, index) => { //.sort((a, b) => { return (a.day < b.day ? 1 : -1) })
                    return (
                      <Row key={index} day={day}/>
                    );
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Paper>
    </div>
  );
}

export default AbnormalBehaviourDumb;