import PatientActivitiesDumb from "./PatientActivitiesDumb";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { Day, SERVER_URL } from "../../../../model/models";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getDaysList } from "../../../../actions/DayAction";
import { Snackbar, CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

interface PatientActivitiesSmartProps {
  getDays: () => void,
  dayReducer: {
    loading: boolean,
    daysSuccess: Day[],
    error: string,
  }
}

function PatientActivitiesSmart({ dayReducer, getDays }: PatientActivitiesSmartProps) {
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [daysList, setDaysList] = useState<Day[]>([])

  useEffect(() => {
    var sock = new SockJS(`${SERVER_URL}/activities`);

    let stompClient = Stomp.over(sock);
    stompClient.connect({}, function (frame) {
      stompClient.subscribe("/topic/patient_activities", function (greeting) {
        let message: Day = JSON.parse(greeting.body);
        setDaysList(list => list.concat(message))
      });
    });

    return function cleanup() {
      stompClient.disconnect(function () {
        console.log("============ Activities WebSocket Closed ==============");
      });
    }
  }, []);

  useEffect(() => {
    getDays()
  }, [getDays]);

  useEffect(() => {
    if (dayReducer.loading) {
      setLoading(true);
    } else if (dayReducer.error !== '') {
      setMessage(dayReducer.error);
      setLoading(false);
      setOpenError(true);
    } else if (dayReducer.daysSuccess) {
      setLoading(false);
      setDaysList(dayReducer.daysSuccess);
    }
  }, [dayReducer.loading, dayReducer.error, dayReducer.daysSuccess]);

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

      <PatientActivitiesDumb
        days={daysList}
      />

      {loading && <CircularProgress />}
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    dayReducer: state.day, //from rootReducer
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getDays: () => dispatch(getDaysList()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientActivitiesSmart);

