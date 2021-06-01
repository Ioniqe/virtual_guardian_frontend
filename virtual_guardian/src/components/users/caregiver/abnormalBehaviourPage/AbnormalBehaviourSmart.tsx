import { CircularProgress, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getEmergenciesOfPatientsOfCaregiver } from "../../../../actions/AbnormalBehaviourAction";
import { ActivityList, Emergency, SERVER_URL, User } from "../../../../model/models";
import AbnormalBehaviourDumb from "./AbnormalBehaviourDumb";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

interface AbnormalBehaviourSmartProps {
  loggedUser: User,

  getEmergencyList: (caregiverId: string) => void,
  abnormalBehaviourReducer: {
    loadingAnomalies: boolean,
    loadingEmergencies: boolean,
    errorEmergencies: string,
    emergenciesOfPatientsOfCaregiverSuccessful: Emergency[],
  },
}

function AbnormalBehaviourSmart({ loggedUser, abnormalBehaviourReducer, getEmergencyList }: AbnormalBehaviourSmartProps) {
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [anomalyList, setAnomalyList] = useState<ActivityList[]>([]);
  const [emergencyList, setEmergencyList] = useState<Emergency[]>([]);

  useEffect(() => {
    var sock = new SockJS(`${SERVER_URL}/abnormal`);

    let stompClient = Stomp.over(sock);
    stompClient.connect({}, function (frame) {
      stompClient.subscribe("/topic/anomaly_object", function (greeting) {

        let message: ActivityList = JSON.parse(greeting.body);

        console.log(message)
        setAnomalyList(list => list.concat(message)); 
      });
    });

    return function cleanup() {
      stompClient.disconnect(function () {
        console.log("============ Anomaly WebSocket Closed ==============");
      });
    }
  }, []);

  console.log('eee')

  useEffect(() => {
    var sock = new SockJS(`${SERVER_URL}/emergency`);

    let stompClient = Stomp.over(sock);
    stompClient.connect({}, function (frame) {
      stompClient.subscribe("/topic/emergency_object", function (greeting) {

        let message: Emergency = JSON.parse(greeting.body);

        if (message.userId === loggedUser.id) {
          setEmergencyList(list => list.concat(message)); //TODO ordoneaza dupa date
        }

      });
    });

    return function cleanup() {
      stompClient.disconnect(function () {
        console.log("============ Emergency WebSocket Closed ==============");
      });
    }
  }, [loggedUser.id, setEmergencyList]);

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
    } else if (abnormalBehaviourReducer.emergenciesOfPatientsOfCaregiverSuccessful) {
      setLoading(false);
      setEmergencyList(abnormalBehaviourReducer.emergenciesOfPatientsOfCaregiverSuccessful);
    }
  }, [abnormalBehaviourReducer.loadingEmergencies, abnormalBehaviourReducer.errorEmergencies,
  abnormalBehaviourReducer.emergenciesOfPatientsOfCaregiverSuccessful, setEmergencyList]);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
  };

  return (
    <>
      <Snackbar open={openError} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error"> {message} </Alert>
      </Snackbar>

      <AbnormalBehaviourDumb
        anomalyList={anomalyList}
        emergencyList={emergencyList}
      />

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
    getEmergencyList: (caregiverId: string) => dispatch(getEmergenciesOfPatientsOfCaregiver(caregiverId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AbnormalBehaviourSmart);

