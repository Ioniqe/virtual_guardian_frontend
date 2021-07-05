import { CircularProgress, Snackbar } from "@material-ui/core"; 
import Alert from "@material-ui/lab/Alert"; 
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { deleteCaregivers, getCaregiversList, saveCaregiver, updateCaregiver } from "../../../../actions/CaregiverAction";
import { User } from "../../../../model/models";
import CaregiversPageDumb from "./CaregiversPageDumb";

interface CaregiversPageProps {
  loggedUser: User,

  getAllCaregiversList: () => void,
  deleteSelectedCaregivers: (caregiversToBeDeleted: string[]) => void,
  saveNewCaregiver: (newCaregiver: User) => void,
  saveEditedCaregiver: (newCaregiver: User) => void,
  caregiverReducer: {
    loading: boolean,
    caregiversSuccess: User[],
    error: string,
    deleteSuccessful: boolean,
    saveSuccessful: boolean,
    updateSuccessful: boolean,
  },
}

function CaregiversPageSmart({ loggedUser, caregiverReducer, getAllCaregiversList, deleteSelectedCaregivers, saveNewCaregiver, saveEditedCaregiver }: CaregiversPageProps) {

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [caregiverList, setCaregiverList] = useState<User[]>([]);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };

  useEffect(() => {
    getAllCaregiversList();
  }, [getAllCaregiversList, loggedUser.id]);

  useEffect(() => {
    if (caregiverReducer.loading) {
      setLoading(true);
    }
    else if (caregiverReducer.error !== '') {
      setMessage(caregiverReducer.error);
      setLoading(false);
      setOpenError(true);
    }
    else if (caregiverReducer.caregiversSuccess) {
      setLoading(false);
      setCaregiverList(caregiverReducer.caregiversSuccess);
    }
  }, [caregiverReducer.error, caregiverReducer.loading, caregiverReducer.caregiversSuccess]);

  useEffect(() => {
    if (caregiverReducer.deleteSuccessful) {
      getAllCaregiversList();
      setMessage('Deleted successfully!');
      setOpenSuccess(true);
    }
  }, [caregiverReducer.deleteSuccessful, getAllCaregiversList, loggedUser.id]);

  useEffect(() => {
    if (caregiverReducer.saveSuccessful) {
      getAllCaregiversList();
      setMessage('Saved successfully!');
      setOpenSuccess(true);
    }
  }, [caregiverReducer.saveSuccessful, getAllCaregiversList, loggedUser.id]);

  useEffect(() => {
    if (caregiverReducer.updateSuccessful) {
      getAllCaregiversList();
      setMessage('Updated successfully!');
      setOpenSuccess(true);
    }
  }, [caregiverReducer.updateSuccessful, getAllCaregiversList, loggedUser.id]);

  return (
    <>
      <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success"> { message } </Alert>
      </Snackbar>

      <Snackbar open={openError} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error"> {message} </Alert>
      </Snackbar>

      <CaregiversPageDumb
        caregiverList={caregiverList}
        deleteSelected={deleteSelectedCaregivers}
        saveCaregiver={saveNewCaregiver}
        saveEditedCaregiver={ saveEditedCaregiver }
      />

      {loading && <CircularProgress />}
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    caregiverReducer: state.caregiver, //from rootReducer
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getAllCaregiversList: () => dispatch(getCaregiversList()),
    deleteSelectedCaregivers: (caregiversToBeDeleted: string[]) => dispatch(deleteCaregivers(caregiversToBeDeleted)),
    saveNewCaregiver: (newCaregiver: User) => dispatch(saveCaregiver(newCaregiver)),
    saveEditedCaregiver: (editedCaregiver: User) => dispatch(updateCaregiver(editedCaregiver)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CaregiversPageSmart);
