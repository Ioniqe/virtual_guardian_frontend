import { CircularProgress, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAnomalies, getEmergenciesOfPatientsOfDoctor } from "../../../../actions/AbnormalBehaviourAction";
import { Anomaly, Emergency, User } from "../../../../model/models";
import AbnormalBehaviourDumb from "./AbnormalBehaviourDumb";

interface AbnormalBehaviourSmartProps {
  loggedUser: User,

  getAnomaliesList: () => void,
  getEmergencyList: (doctorId: string) => void,
  abnormalBehaviourReducer: {
    loadingAnomalies: boolean,
    errorAnomalies: string,
    loadingEmergencies: boolean,
    errorEmergencies: string,
    anomaliesSuccessful: Anomaly[],
    emergenciesOfPatientsOfDoctorSuccessful: Emergency[],
  },
}

function AbnormalBehaviourSmart({ loggedUser, abnormalBehaviourReducer, getAnomaliesList, getEmergencyList }: AbnormalBehaviourSmartProps) {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [anomalyList, setAnomalyList] = useState<Anomaly[]>([]);
  const [emergencyList, setEmergencyList] = useState<Emergency[]>([]);

  useEffect(() => {
    getAnomaliesList()
  }, [getAnomaliesList]);

  useEffect(() => {
    if (abnormalBehaviourReducer.loadingAnomalies) {
      setLoading(true);
    } else if (abnormalBehaviourReducer.errorAnomalies !== '') {
      setMessage(abnormalBehaviourReducer.errorAnomalies);
      setLoading(false);
      setOpenError(true);
    } else if (abnormalBehaviourReducer.anomaliesSuccessful) {
      setLoading(false);
      setAnomalyList(abnormalBehaviourReducer.anomaliesSuccessful);
    }
  }, [abnormalBehaviourReducer.loadingAnomalies, abnormalBehaviourReducer.errorAnomalies, abnormalBehaviourReducer.anomaliesSuccessful]);

  useEffect(() => {
    getEmergencyList(loggedUser.id)
  }, [getEmergencyList, loggedUser.id]);

  useEffect(() => {
    if (abnormalBehaviourReducer.loadingEmergencies) {
      setLoading(true);
    } else if (abnormalBehaviourReducer.errorEmergencies !== '') {
      setMessage(abnormalBehaviourReducer.errorEmergencies);
      setLoading(false);
      setOpenError(true);
    } else if (abnormalBehaviourReducer.emergenciesOfPatientsOfDoctorSuccessful) {
      setLoading(false);
      setEmergencyList(abnormalBehaviourReducer.emergenciesOfPatientsOfDoctorSuccessful);
    }
  }, [abnormalBehaviourReducer.loadingEmergencies, abnormalBehaviourReducer.errorEmergencies, abnormalBehaviourReducer.emergenciesOfPatientsOfDoctorSuccessful]);

  useEffect(() => {
    if (anomalyList !== [] && emergencyList !== []) {
      console.log(anomalyList)
      console.log(emergencyList)
    }
  }, [anomalyList, emergencyList]);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };

  return (
    <>
      <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success"> {message} </Alert>
      </Snackbar>

      <Snackbar open={openError} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error"> {message} </Alert>
      </Snackbar>

      <AbnormalBehaviourDumb />

      {loading && <CircularProgress />}
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    abnormalBehaviourReducer: state.abnormalBehaviour, //from rootReducer
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getAnomaliesList: () => dispatch(getAnomalies()),
    getEmergencyList: (doctorId: string) => dispatch(getEmergenciesOfPatientsOfDoctor(doctorId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AbnormalBehaviourSmart);

