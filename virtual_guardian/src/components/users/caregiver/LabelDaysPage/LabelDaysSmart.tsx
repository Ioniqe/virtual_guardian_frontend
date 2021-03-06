import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getActivities } from "../../../../actions/ActivityAction";
import { getLabeledDaysList, saveAnomalousDays } from "../../../../actions/LabeledDayAction";
import { ActivityList, LabeledDay } from "../../../../model/models";
import LabelDaysDumb from "./LabelDaysDumb";

interface LabelDaysSmartProps {
  getActivitiesList: () => void,
  activityReducer: {
    loading: boolean,
    activitiesSuccess: ActivityList[],
    error: string,
  },

  getLabeledDays: (label: string) => void,
  saveAnomalousLabeledDays: (selectedDays: Date[]) => void,
  labeledDayReducer: {
    loading: boolean,
    labeledDaysSuccess: LabeledDay[],
    error: '',
    saveSuccessful: boolean,
  }
}

function LabelDaysSmart({ getActivitiesList, activityReducer, getLabeledDays, saveAnomalousLabeledDays, labeledDayReducer }: LabelDaysSmartProps) {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState<Date[]>([]);
  const [activitiesList, setActivitiesList] = useState<ActivityList[]>([]);

  let sendSelected = (): void => {
    saveAnomalousLabeledDays(selected)
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

      let activities = activityReducer.activitiesSuccess
      activities.sort((a, b) => { return (a.day < b.day ? -1 : 1) })

      setActivitiesList(activities);
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
    else if (labeledDayReducer.labeledDaysSuccess.length !== 0 && labeledDayReducer.saveSuccessful === false) {
      setLoading(false);

      let anomalousDays: Date[] = [];
      labeledDayReducer.labeledDaysSuccess.forEach(labeledDay => {
        anomalousDays.push(labeledDay.day);
      });

      setSelected(anomalousDays);
    }
  }, [labeledDayReducer.loading, labeledDayReducer.error, labeledDayReducer.labeledDaysSuccess, labeledDayReducer.saveSuccessful]);

  useEffect(() => {
    if (labeledDayReducer.saveSuccessful === true) {
      setMessage('Successfully Saved')
      setOpenError(false)
      setOpenSuccess(true)
      setLoading(false)
    }
  }, [labeledDayReducer.saveSuccessful]);

  return (
    <>
      <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
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
        sendSelected={sendSelected}
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
    getActivitiesList: () => dispatch(getActivities('train')),
    getLabeledDays: (label: string) => dispatch(getLabeledDaysList(label)),
    saveAnomalousLabeledDays: (selectedDays: Date[]) => dispatch(saveAnomalousDays(selectedDays)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LabelDaysSmart);