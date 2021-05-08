import { CircularProgress, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { deleteAdmins, getAdmins } from "../../../../actions/AdminAction";
import { User } from "../../../../model/models";
import AllAdminsTableDumb from "./AllAdminsTableDumb";

interface AllAdminsTableProps {
  getAllAdminsList: () => void,
  deleteSelectedAdmins: (adminsToBeDeleted: string[]) => void,
  adminReducer: {
    loading: boolean,
    adminsSuccess: User[],
    error: string,
    deleteSuccessful: boolean
  },
}

function AllAdminsTableSmart({ getAllAdminsList, adminReducer, deleteSelectedAdmins }: AllAdminsTableProps) {

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [adminList, setAdminList] = useState<User[]>([]);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };

  useEffect(() => {
    getAllAdminsList();
  }, [getAllAdminsList]);

  useEffect(() => {
    if (adminReducer.loading) {
      setLoading(true);
    }
    else if (adminReducer.error !== '') {
      setMessage(adminReducer.error);
      setLoading(false);
      setOpenError(true);
    }
    else if (adminReducer.adminsSuccess) {
      setLoading(false);
      setAdminList(adminReducer.adminsSuccess);
    }
  }, [adminReducer.error, adminReducer.loading, adminReducer.adminsSuccess]);

  useEffect(() => {
    if (adminReducer.deleteSuccessful) {
      getAllAdminsList();
      setOpenSuccess(true);
    }
  }, [adminReducer.deleteSuccessful, getAllAdminsList]);

  return (
    <>
      <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success"> Deleted successfuly! </Alert>
      </Snackbar>

      <Snackbar open={openError} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error"> {message} </Alert>
      </Snackbar>

      {/* {adminReducer.loading ?
        <h1>Loading</h1> : adminReducer.error ?
          <h1>Oops, an error has occured</h1> : */}
      <AllAdminsTableDumb
        adminList={adminList}
        deleteSelected={deleteSelectedAdmins}
      // refreshList={setAdminList}
      />
      {/* } */}
      {loading && <CircularProgress />}

    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    adminReducer: state.allAdmins, //from rootReducer
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getAllAdminsList: () => dispatch(getAdmins()),
    deleteSelectedAdmins: (adminsToBeDeleted: string[]) => dispatch(deleteAdmins(adminsToBeDeleted)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllAdminsTableSmart);
