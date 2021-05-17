// import { Stomp } from "@stomp/stompjs";
// import { useEffect } from "react";

// import SockJS from "sockjs-client";
// import { SERVER_URL, WebSocketMessages } from "../../../model/models";

function DoctorHomeSmart() {

  // var sock = new SockJS(`${SERVER_URL}/abnormal`);

  // useEffect(() => {

  //   let stompClient = Stomp.over(sock);
  //   sock.onopen = function () {
  //     console.log('open');
  //   }

  //   stompClient.connect({}, function (frame: string) {
  //     console.log('Connected: ' + frame);

  //     stompClient.subscribe("/topic/app", function (greeting) {

  //       let message: WebSocketMessages = JSON.parse(greeting.body);

  //       alert(message.day + ' ' + message.message);
  //     });
  //   });

  // }, []);

  return (
    <>
      <h1>Hello Doctor</h1>
    </>
  );
}

export default DoctorHomeSmart;