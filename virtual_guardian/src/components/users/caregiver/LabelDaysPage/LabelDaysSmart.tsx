import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getActivities } from "../../../../actions/ActivityAction";
import { getLabeledDaysList } from "../../../../actions/LabeledDayAction";
import { Activity, ActivityList, LabeledDay } from "../../../../model/models";
import LabelDaysDumb from "./LabelDaysDumb";

interface LabelDaysSmartProps {
  getActivitiesList: () => void,
  activityReducer: {
    loading: boolean,
    activitiesSuccess: Activity[],
    error: string,
  },

  getLabeledDays: (label: string) => void,
  labeledDayReducer: {
    loading: false,
    labeledDaysSuccess: LabeledDay[],
    error: '',
  }
}

function LabelDaysSmart({ getActivitiesList, activityReducer, getLabeledDays, labeledDayReducer }: LabelDaysSmartProps) {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState<Date[]>([]);
  const [activitiesList, setActivitiesList] = useState<ActivityList[]>([]);

  let sendSelected = (): void => {
    console.log('send these');
    console.log(selected)
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
    getLabeledDays('anomalous')
  }, [getLabeledDays]);

  useEffect(() => {
    if (activityReducer.loading) {
      setLoading(true);
      setOpenSuccess(false);
      setOpenError(false);
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
    if (labeledDayReducer.loading) {
      setLoading(true);
      setOpenSuccess(false);
      setOpenError(false);
    }
    else if (labeledDayReducer.error !== '') {
      setMessage(labeledDayReducer.error);
      setLoading(false);
      setOpenError(true);
    }
    else if (labeledDayReducer.labeledDaysSuccess.length !== 0) {
      setLoading(false);

      let anomalousDays: Date[] = [];
      labeledDayReducer.labeledDaysSuccess.forEach(labeledDay => {
        anomalousDays.push(labeledDay.day);
      });

      setSelected(anomalousDays);
    }
  }, [labeledDayReducer.loading, labeledDayReducer.error, labeledDayReducer.labeledDaysSuccess]);


  
  return (
    <>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success"> {message} </Alert>
      </Snackbar>

      <Snackbar open={openError} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error"> {message} </Alert>
      </Snackbar>

      <LabelDaysDumb
        activitiesList={activitiesList}
        selected={selected}
        setSelected={setSelected}
        loading={loading}
        sendSelected={ sendSelected}
      />
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    activityReducer: state.activity, //from rootReducer
    labeledDayReducer: state.labeledDay
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getActivitiesList: () => dispatch(getActivities()),
    getLabeledDays: (label: string) => dispatch(getLabeledDaysList(label)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LabelDaysSmart);