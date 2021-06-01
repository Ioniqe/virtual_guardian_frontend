import { Paper } from "@material-ui/core";
import { User } from "../../../../model/models";
import { useStylesPatient } from "../../../../styles/PatientStyle";
import TableWithDeleteFeature from "../../admin/AllAdminsTablePage/TableWithDeleteFeature";

interface PatientListDumbProps {
  patientList: User[],
  deleteSelected: (patientsToBeDeleted: string[]) => void,
  saveEditedPatient: (editedUser: User) => void,
}

function PatientListDumb({ patientList, deleteSelected, saveEditedPatient }: PatientListDumbProps) {
  let style = useStylesPatient();

  let headers = ['Username', 'Password', 'First Name', 'Last Name', 'Adresss', 'Birthday', 'Gender'];

  return (
    <div style={{ position: 'relative' }}>
      <Paper elevation={0} className={style.patientsTableStyle}>
        <TableWithDeleteFeature
          data={patientList}
          title={'Your Patients'}
          headers={headers}
          deleteSelected={deleteSelected}
          userType={'patient_of_caregiver'}
          saveUser={saveEditedPatient}
        />
      </Paper>
    </div>
  );
}

export default PatientListDumb;