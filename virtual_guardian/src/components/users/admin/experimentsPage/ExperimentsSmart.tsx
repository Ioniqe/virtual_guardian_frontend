import ExperimentsDumb from "./ExperimentsDumb";
import { connect } from "react-redux";
import { getActivities } from "../../../../actions/ActivityAction";
import { Activity, ActivityList } from "../../../../model/models";
import React, { useEffect, useState } from "react";
import { CircularProgress, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

interface ExperimentsSmartProps {
  getActivitiesList: () => void,
  activityReducer: {
    loading: boolean,
    activitiesSuccess: Activity[],
    error: string,
  },
}

function ExperimentsSmart({ activityReducer, getActivitiesList }: ExperimentsSmartProps) {

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [activitiesList, setActivitiesList] = useState<ActivityList[]>([]);

  let predict = (): void => {
    console.log('predict');
  }

  let setDefault = (): void => {
    console.log('set default');
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
        } else {
          activities.push(activity);
        }
      });

      setActivitiesList(days);
    }
  }, [activityReducer.error, activityReducer.loading, activityReducer.activitiesSuccess]);

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
        setDefault={setDefault}
        activitiesList={activitiesList}
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExperimentsSmart);
