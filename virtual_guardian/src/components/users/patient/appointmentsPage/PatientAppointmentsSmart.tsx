import { User } from "../../../../model/models";
import PatientAppointmentsDumb from "./PatientAppointmentsDumb";

interface PatientAppointmentsSMartProps{
  loggedUser: User
}

function PatientAppointmentsSmart({ loggedUser } : PatientAppointmentsSMartProps) {
  return (
    <>
      <PatientAppointmentsDumb />
    </>
  );
}

export default PatientAppointmentsSmart;