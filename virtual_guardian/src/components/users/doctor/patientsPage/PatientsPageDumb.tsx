import { IconButton, Paper, Tooltip } from "@material-ui/core";
import { User } from "../../../../model/models";
import { useStylesPatient } from "../../../../styles/PatientStyle";
import TableWithDeleteFeature from "../../admin/AllAdminsTablePage/TableWithDeleteFeature";

import AddIcon from '@material-ui/icons/Add';
import React, { useState } from "react";
import PopupSignUp from "../../../popups/PopupSignUp";

interface PatientsPageDumbProps {
  patientList: User[],
  doctorId: string,
  deleteSelected: (patientsToBeDeleted: string[]) => void,
  savePatient: (newPatient: User, doctorId: string) => void,
  saveEditedPatient: (editedUser: User) => void
}

//TODO add disease, remove disease
//TODO modify add button

function PatientsPageDumb({ patientList, deleteSelected, savePatient, doctorId, saveEditedPatient }: PatientsPageDumbProps) {
  let style = useStylesPatient();

  const [open, setOpen] = useState(false);

  let headers = ['Username', 'Password', 'First Name', 'Last Name', 'Adresss', 'Birthday', 'Gender'];

  let sendNewUser = (username: string, password: string,
    firstName: string, lastName: string,
    birthday: string,
    gender: string, address?: string): void => {
    let newPatient: User = {
      'doctorId': doctorId, 'address': address as string,
      'username': username, 'password': password,
      'firstname': firstName, 'lastname': lastName,
      'birthday': birthday, 'gender': gender, type: 'patient', id: ''
    };
    savePatient(newPatient, doctorId);
  }

  let addPatient = (): void => {
    setOpen(true);
  }

  return (
    <div style={{ position: 'relative' }}>

      <PopupSignUp
        title={'Register Patient'}
        userType={'patient'}
        sendNewUser={sendNewUser}
        open={open}
        setOpen={setOpen}
      />

      <Paper elevation={0} className={style.patientsTableStyle}>
        <TableWithDeleteFeature
          data={patientList}
          title={'Your Patients'}
          headers={headers}
          deleteSelected={deleteSelected}
          userType={'patient'}
          saveUser={ saveEditedPatient }
        />
      </Paper>

      <Tooltip title="Add Patient" className={style.addPatientTooltipStyle}>
        <IconButton aria-label="add_patient" onClick={addPatient} >
          <AddIcon className={style.addPatientButtonStyle} />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default PatientsPageDumb;