import ExperimentsDumb from "./ExperimentsDumb";
import { connect } from "react-redux";
import { detectAnomalies, getActivities } from "../../../../actions/ActivityAction";
import { Activity, ActivityList, DayDetected } from "../../../../model/models";
import React, { useEffect, useState } from "react";
import { CircularProgress, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { getDaysWithTheirActivities } from "../../../../utils/ExperimentsUtils";

interface ExperimentsSmartProps {
  getActivitiesList: () => void,
  detectDays: (dayToDetect: ActivityList[]) => void,
  activityReducer: {
    loading: boolean,
    activitiesSuccess: Activity[],
    error: string,
    detected: DayDetected[],
  },
}

function ExperimentsSmart({ activityReducer, getActivitiesList, detectDays }: ExperimentsSmartProps) {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [activitiesList, setActivitiesList] = useState<ActivityList[]>([]);
  const [features, setFeatures] = useState('durationFrequencyRatio');
  const [algorithm, setAlgorithm] = useState('logisticRegression');
  const [selected, setSelected] = React.useState<Date[]>([]);

  let predict = (): void => {
    if (selected.length !== 0) {

      console.log(algorithm)
      console.log(features)

      if (activitiesList.length !== 0) {
        console.log('Sending')
        let selectedActvities = getDaysWithTheirActivities(selected, activitiesList)
        console.log(selectedActvities)
        detectDays(selectedActvities)
      }
    }
  }

  let train = (): void => {
    console.log('train')
  }

  let setDefault = (): void => {
    console.log('set default');
    //TODO
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };

  useEffect(() => {
    getActivitiesList()
  }, [getActivitiesList]);

  useEffect(() => {
    if (activityReducer.loading) {
      setLoading(true);
    }
    else if (activityReducer.error !== '') {
      setMessage(activityReducer.error);
      setLoading(false);
      setOpenError(true);
    }
    else if (activityReducer.activitiesSuccess.length !== 0) {
      setLoading(false);

      let days: ActivityList[] = [];
      let activities: Activity[] = [];
      let currDay = activityReducer.activitiesSuccess[0].day;
      activityReducer.activitiesSuccess.forEach(activity => {
        if (activity.day !== currDay) {
          days.push({ day: currDay, activities: activities });
          currDay = activity.day;
          activities = [];
        }
        activities.push(activity);
      });

      setActivitiesList(days);
    } 
  }, [activityReducer.error, activityReducer.loading, activityReducer.activitiesSuccess]);

  useEffect(() => {
    if (activityReducer.detected !== []) {
      console.log('Getting');
      console.log(activityReducer.detected)
    }
  }, [activityReducer.detected]);

  return (
    <>
      <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success"> Deleted successfuly! </Alert>
      </Snackbar>

      <Snackbar open={openError} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error"> {message} </Alert>
      </Snackbar>

      <ExperimentsDumb
        predict={predict}
        train={train}
        setDefault={setDefault}
        activitiesList={activitiesList}
        features={features}
        setFeatures={setFeatures}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        selected={selected}
        setSelected={setSelected}
      />

      {loading && <CircularProgress />}
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    activityReducer: state.activity, //from rootReducer
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getActivitiesList: () => dispatch(getActivities()),
    detectDays: (dayToDetect: ActivityList[]) => dispatch(detectAnomalies(dayToDetect)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExperimentsSmart);
