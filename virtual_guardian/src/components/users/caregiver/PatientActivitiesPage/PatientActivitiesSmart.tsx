import PatientActivitiesDumb from "./PatientActivitiesDumb";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { Activity, SERVER_URL, WebSocketActivities } from "../../../../model/models";
import { useEffect, useState } from "react";


function PatientActivitiesSmart() {

  const [activityList, setActivityList] = useState<Activity[]>([]);
  const [prediction, setPrediction] = useState('');

  useEffect(() => {
    var sock = new SockJS(`${SERVER_URL}/activities`);

    let stompClient = Stomp.over(sock);
    stompClient.connect({}, function (frame) {
      //TODO decide whether notification appears for a certain patient and caregiver or for all caregivers
      stompClient.subscribe("/topic/patient_activities", function (greeting) {

        let message: WebSocketActivities = JSON.parse(greeting.body);

        setActivityList(message.arr);
        setPrediction(message.prediction);
      });
    });

    return function cleanup() {
      stompClient.disconnect(function () {
        console.log("============ Activities WebSocket Closed ==============");
      });
    }
  }, []);

  return (
    <>
      <PatientActivitiesDumb
        activityList={activityList}
        prediction={prediction}
      />
    </>
  );
}

export default PatientActivitiesSmart;