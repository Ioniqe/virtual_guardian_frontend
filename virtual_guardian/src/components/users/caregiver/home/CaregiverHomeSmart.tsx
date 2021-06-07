
import { useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { SERVER_URL, User, WebSocketMessages } from "../../../../model/models";
import CaregiverHomeDumb from './CaregiverHomeDumb';

interface CaregiverHomeSmartProps {
  loggedUser: User,
}

function CaregiverHomeSmart({ loggedUser }: CaregiverHomeSmartProps) {
  useEffect(() => {
    var sock = new SockJS(`${SERVER_URL}/abnormal`);

    let stompClient = Stomp.over(sock);
    stompClient.connect({}, function (frame) {
      stompClient.subscribe("/topic/app", function (greeting) {

        let message: WebSocketMessages = JSON.parse(greeting.body);

        alert(message.day + ' is ' + message.message);
      });
    });

    return function cleanup() {
      stompClient.disconnect(function () {
        console.log("============ Anomaly WebSocket Closed ==============");
      });
    }
  }, []);

  return (
    <>
      <CaregiverHomeDumb
        loggedUser={loggedUser}
      />
    </>
  );
}

export default CaregiverHomeSmart;