
import { useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { SERVER_URL, WebSocketMessages } from "../../../model/models";

function CaregiverHomeSmart() {


  useEffect(() => {
    var sock = new SockJS(`${SERVER_URL}/abnormal`);

    let stompClient = Stomp.over(sock);
    stompClient.connect({}, function (frame) {
      //TODO decide whether notification appears for a certain patient and caregiver or for all caregivers
      stompClient.subscribe("/topic/app", function (greeting) {
  
        console.log(greeting);
  
        let message: WebSocketMessages = JSON.parse(greeting.body);
  
        alert(message.day + ' is ' + message.message);
      });
    });

    return function cleanup() {
      stompClient.disconnect(function() {
        console.log("============ Anomaly WebSocket Closed ==============");
      });
    }
  }, []);

  return (
    <>
      <h1>Hello Caregiver</h1>
    </>
  );
}

//TODO see patient activity history, same for doctor
//TODO see history of emergencies and anomalies
export default CaregiverHomeSmart;