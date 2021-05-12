import { Paper } from "@material-ui/core";
import { User } from "../../../../model/models";
import { useStylesPatient } from "../../../../styles/PatientStyle";
import TableWithDeleteFeature from "../../admin/AllAdminsTablePage/TableWithDeleteFeature";

interface PatientsPageDumbProps {
  patientList: User[],
  deleteSelected: (patientsToBeDeleted: string[]) => void,
}

function PatientsPageDumb({ patientList, deleteSelected }: PatientsPageDumbProps) {
  let style = useStylesPatient();


  let headers = ['Username', 'Password', 'First Name', 'Last Name', 'Adresss', 'Birthday', 'Gender'];
  
  return (
    <>
      <Paper elevation={0} className={ style.adminsTableStyle }>
        <TableWithDeleteFeature
          data={patientList}
          title={'Your Patients'}
          headers={headers}
          deleteSelected={deleteSelected}
        />
      </Paper>
    </>
  );
}

export default PatientsPageDumb;