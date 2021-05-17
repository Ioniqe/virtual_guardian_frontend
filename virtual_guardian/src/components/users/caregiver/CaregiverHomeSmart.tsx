
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { SERVER_URL, WebSocketMessages } from "../../../model/models";

function CaregiverHomeSmart() {

  var sock = new SockJS(`${SERVER_URL}/abnormal`);

  let stompClient = Stomp.over(sock);
  sock.onopen = function () {
    console.log('open');
  }

  stompClient.connect({}, function (frame) {

    stompClient.subscribe("/topic/app", function (greeting) {

      console.log(greeting);

      let message: WebSocketMessages = JSON.parse(greeting.body);

      alert(message.day + ' is ' + message.message);
    });
  });

  return (
    <>
      <h1>Hello Caregiver</h1>
    </>
  );
}

//TODO see patient activity history, same for doctor
//TODO see history of emergencies and anomalies
export default CaregiverHomeSmart;