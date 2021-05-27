import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { Activity } from "../../../../model/models";
import { useStylesActivityList } from "../../../../styles/CaregiverStyle";

interface PatientActivitiesDumbProps {
  activityList: Activity[],
  prediction: string
}

function PatientActivitiesDumb({ activityList, prediction }: PatientActivitiesDumbProps) {
  let style = useStylesActivityList();

  return (
    <>
      <Paper elevation={0} className={style.tablePaperStyle}>
        {
          activityList.length !== 0 && (
            prediction === 'anomalous' ?
              <h1 className={style.titleStyle}>{activityList[0].day}: <span style={{ color: 'red' }}>{prediction}</span></h1> :
              <h1 className={style.titleStyle}>{activityList[0].day}: {prediction}</h1>
          )
        }
        <Paper className={style.paper}>
          <TableContainer>
            <Table className={style.tableStyle} aria-label="simple table">
              <TableHead>
                <TableRow style={{ width: '50%' }}>
                  <TableCell align='center'>Activity</TableCell>
                  <TableCell align='center'>Start Time</TableCell>
                  <TableCell align='center'>End Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activityList.map((activity, index) => (
                  <TableRow key={index}>
                    <TableCell align='center' component="th" scope="row">
                      {activity.activity}
                    </TableCell>
                    <TableCell align='center'>{activity.startTime}</TableCell>
                    <TableCell align='center'>{activity.endTime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Paper>
    </>
  );
}

export default PatientActivitiesDumb;