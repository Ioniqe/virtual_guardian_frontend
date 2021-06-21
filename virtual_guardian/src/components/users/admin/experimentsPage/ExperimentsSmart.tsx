import ExperimentsDumb from "./ExperimentsDumb";
import { connect } from "react-redux";
import { detectAnomalies, getActivities, setDefaultModel, trainModel } from "../../../../actions/ActivityAction";
import { ActivityList, DayDetected, TrainModel } from "../../../../model/models";
import React, { useEffect, useState } from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { getDaysWithTheirActivities } from "../../../../utils/ExperimentsUtils";

interface ExperimentsSmartProps {
  getActivitiesList: () => void,
  detectDays: (dayToDetect: ActivityList[]) => void,
  train: (_trainModel: TrainModel) => void,
  setDefault: () => void,
  activityReducer: {
    loading: boolean,
    activitiesSuccess: ActivityList[],
    error: string,
    detected: DayDetected[],
    trained: number,
    defaultModelSuccess: boolean,
  },
}

function ExperimentsSmart({ activityReducer, getActivitiesList, detectDays, train, setDefault }: ExperimentsSmartProps) {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [activitiesList, setActivitiesList] = useState<ActivityList[]>([]);
  const [features, setFeatures] = useState('durationFrequencyRatio');
  const [algorithm, setAlgorithm] = useState('logisticRegression');
  const [selected, setSelected] = React.useState<Date[]>([]);
  const [detectedDaysList, setDetectedDaysList] = React.useState<DayDetected[]>([]);
  const [score, setScore] = React.useState(-1);

  const [defaultAlgorithm, setDefaultAlgorithm] = React.useState('durationFrequencyRatio');
  const [defaultFeatures, setDefaultFeatures] = React.useState('logisticRegression');

  const [buttVisible, makeButtVisible] = React.useState(false);

  let predict = (): void => {
    if (selected.length !== 0) {

      if (activitiesList.length !== 0) {
        let selectedActvities = getDaysWithTheirActivities(selected, activitiesList)
        detectDays(selectedActvities)
      }
    }
  }

  let handleTrainEvent = (): void => {
    makeButtVisible(true)

    let trainModel: TrainModel = { 'algorithm': algorithm, 'features': features }
    train(trainModel)
  }

  let setDefaultEvent = (): void => {
    setDefaultAlgorithm(algorithm)
    setDefaultFeatures(features)
    setDefault();
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
      setActivitiesList(activityReducer.activitiesSuccess);
    }
  }, [activityReducer.error, activityReducer.loading, activityReducer.activitiesSuccess, features]);

  useEffect(() => {
    if (activityReducer.detected !== []) {
      setDetectedDaysList(activityReducer.detected)
      setScore(-1)
    }
  }, [activityReducer.detected]);

  useEffect(() => {
    if (activityReducer.trained !== -1) {
      setScore(activityReducer.trained)
      setDetectedDaysList([])
    }
  }, [activityReducer.trained]);

  useEffect(() => {
    if (activityReducer.defaultModelSuccess !== false) {
      setMessage(`Algorithm ${defaultAlgorithm} and features ${defaultFeatures} successfully set as default!`)
      setLoading(false)
      setOpenError(false)
      setOpenSuccess(true)
    }
  }, [activityReducer.defaultModelSuccess, defaultAlgorithm, defaultFeatures]);

  return (
    <>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success"> {message} </Alert>
      </Snackbar>

      <Snackbar open={openError} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error"> {message} </Alert>
      </Snackbar>

      <ExperimentsDumb
        predict={predict}
        train={handleTrainEvent}
        setDefault={setDefaultEvent}
        activitiesList={activitiesList}
        features={features}
        setFeatures={setFeatures}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        selected={selected}
        setSelected={setSelected}
        detectedDaysList={detectedDaysList}
        loading={loading}
        score={score}
        buttVisible={buttVisible}
      />
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
    getActivitiesList: () => dispatch(getActivities('test')),
    detectDays: (dayToDetect: ActivityList[]) => dispatch(detectAnomalies(dayToDetect)),
    train: (_trainModel: TrainModel) => dispatch(trainModel(_trainModel)),
    setDefault: () => dispatch(setDefaultModel()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExperimentsSmart);
