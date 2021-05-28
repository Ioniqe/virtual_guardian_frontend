import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useEffect } from "react";
import { EmergencyWebsocket, SERVER_URL, User } from '../../../model/models';

interface DoctorHomeSmartProps {
  loggedUser: User,
}

function DoctorHomeSmart({ loggedUser}: DoctorHomeSmartProps) {

  useEffect(() => {
    var sock = new SockJS(`${SERVER_URL}/emergency`);

    let stompClient = Stomp.over(sock);
    stompClient.connect({}, function (frame) {
      //TODO decide whether notification appears for a certain patient and caregiver or for all caregivers
      stompClient.subscribe("/topic/patient_emergency", function (greeting) {

        let message: EmergencyWebsocket = JSON.parse(greeting.body);

        console.log(message)

        if (message.userId === loggedUser.id) {
          alert(`Patient ${message.patientName} has an emergency!`);
        }

      });
    });

    return function cleanup() {
      stompClient.disconnect(function () {
        console.log("============ Emergency WebSocket Closed ==============");
      });
    }
  }, [loggedUser.id]);

  return (
    <>
      <h1>Hello Doctor</h1>
    </>
  );
}

export default DoctorHomeSmart;