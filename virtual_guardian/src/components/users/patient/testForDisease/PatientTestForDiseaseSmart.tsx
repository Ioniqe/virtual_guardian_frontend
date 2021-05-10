import { User } from "../../../../model/models";
import PatientTestForDiseaseDumb from "./PatientTestForDiseaseDumb";

interface PatientAppointmentsSMartProps{
  loggedUser: User
}

function PatientTestForDiseaseSmart({ loggedUser } : PatientAppointmentsSMartProps) {
  return (
    <>
      <PatientTestForDiseaseDumb />
    </>
  );
}

export default PatientTestForDiseaseSmart;