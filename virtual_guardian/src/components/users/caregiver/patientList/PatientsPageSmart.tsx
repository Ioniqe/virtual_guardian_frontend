import { CircularProgress, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { assignCaregiver, deletePatients, getPatient, getPatientsList, savePatient, updatePatient } from "../../../../actions/PatientAction";
import { User } from "../../../../model/models";
import CaregiversListPopup from "../../doctor/patientsPage/CaregiversListPopup";
import PatientsPageDumb from "../../doctor/patientsPage/PatientsPageDumb";

let emptyUser: User = {
  id: '',
  doctorId: '',
  caregiverId: '',
  address: '',
  username: '',
  password: '',
  firstname: '',
  lastname: '',
  birthday: new Date(),
  gender: '',
  type: '',
}

interface PatientsPageProps {
  loggedUser: User,

  getAllPatientsList: (doctorId: string) => void,
  deleteSelectedPatients: (patientsToBeDeleted: string[]) => void,
  saveNewPatient: (newPatient: User, doctorId: string) => void,
  saveEditedPatient: (editedPatient: User) => void,
  assignCaregiverEvent: (caregiverId: string, patientId: string) => void,
  getPatientEvent: (patientId: string) => void,
  patientReducer: {
    loading: boolean,
    patientsSuccess: User[],
    error: string,
    deleteSuccessful: boolean,
    saveSuccessful: boolean,
    updateSuccessful: boolean,
    caregiverAssigned: boolean,
    getPatientSuccess: User,
  },
}

function PatientsPageSmart({ loggedUser, patientReducer, getAllPatientsList, deleteSelectedPatients, saveNewPatient, saveEditedPatient, assignCaregiverEvent, getPatientEvent }: PatientsPageProps) {

  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [patientList, setPatientList] = useState<User[]>([]);
  const [selectedCaregiver, setSelectedCaregiver] = useState(''); //caregiverId
  const [patient, setPatient] = useState<User>(emptyUser);

  let assignCaregiver = (patientId: string): void => {
    getPatientEvent(patientId);
    // setPatient(patientId);
    setOpen(true);
  }

  useEffect(() => {
    if (patientReducer.getPatientSuccess !== emptyUser) {
      setPatient(patientReducer.getPatientSuccess);
    }
  }, [patientReducer.getPatientSuccess]);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };

  useEffect(() => {
    getAllPatientsList(loggedUser.id);
  }, [getAllPatientsList, loggedUser.id]);

  useEffect(() => {
    if (patientReducer.loading) {
      setLoading(true);
    }
    else if (patientReducer.error !== '') {
      setMessage(patientReducer.error);
      setLoading(false);
      setOpenError(true);
    }
    else if (patientReducer.patientsSuccess) {
      setLoading(false);
      setPatientList(patientReducer.patientsSuccess);
    }
  }, [patientReducer.error, patientReducer.loading, patientReducer.patientsSuccess]);

  useEffect(() => {
    if (patientReducer.deleteSuccessful) {
      getAllPatientsList(loggedUser.id);
      setMessage('Deleted successfully!');
      setOpenSuccess(true);
    }
  }, [patientReducer.deleteSuccessful, getAllPatientsList, loggedUser.id]);

  useEffect(() => {
    if (patientReducer.saveSuccessful) {
      getAllPatientsList(loggedUser.id);
      setMessage('Saved successfully!');
      setOpenSuccess(true);
      setOpenError(false)
    }
  }, [patientReducer.saveSuccessful, getAllPatientsList, loggedUser.id]);

  useEffect(() => {
    if (patientReducer.updateSuccessful) {
      getAllPatientsList(loggedUser.id);
      setMessage('Updated successfully!');
      setOpenSuccess(true);
      setOpenError(false)
    }
  }, [patientReducer.updateSuccessful, getAllPatientsList, loggedUser.id]);

  useEffect(() => {
    if (patientReducer.caregiverAssigned) {
      setMessage('Caregiver assigned!');
      setOpenSuccess(true);
      setOpenError(false)
    }
  }, [patientReducer.caregiverAssigned]);

  return (
    <>
      <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success"> {message} </Alert>
      </Snackbar>

      <Snackbar open={openError} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error"> {message} </Alert>
      </Snackbar>

      <CaregiversListPopup
        open={open}
        setOpen={setOpen}
        setMessage={setMessage}
        setOpenError={setOpenError}
        selectedCaregiver={selectedCaregiver}
        setSelectedCaregiver={setSelectedCaregiver}
        patient={patient}
        assignCaregiverEvent={assignCaregiverEvent}
      />

      <PatientsPageDumb
        patientList={patientList}
        deleteSelected={deleteSelectedPatients}
        savePatient={saveNewPatient}
        doctorId={loggedUser.id}
        saveEditedPatient={saveEditedPatient}
        assignCaregiver={assignCaregiver}
      />

      {loading && <CircularProgress />}
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    patientReducer: state.patient, //from rootReducer
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getAllPatientsList: (doctorId: string) => dispatch(getPatientsList(doctorId)),
    deleteSelectedPatients: (patientsToBeDeleted: string[]) => dispatch(deletePatients(patientsToBeDeleted)),
    saveNewPatient: (newPatient: User, doctorId: string) => dispatch(savePatient(newPatient, doctorId)),
    saveEditedPatient: (editedPatient: User) => dispatch(updatePatient(editedPatient)),
    assignCaregiverEvent: (caregiverId: string, patientId: string) => dispatch(assignCaregiver(caregiverId, patientId)),
    getPatientEvent: (patientId: string) => dispatch(getPatient(patientId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientsPageSmart);
