import { useEffect } from "react";
import { connect } from "react-redux";
import { getAdmins } from "../../../../actions/AdminAction";
import { User } from "../../../../model/models";
import AllAdminsTableDumb from "./AllAdminsTableDumb";

interface AllAdminsTableProps {
  getAllAdminsList: () => void,
  adminReducer: {
    loading: boolean,
    adminsSuccess: User[],
    error: string
  },
}

function AllAdminsTableSmart({ getAllAdminsList, adminReducer }: AllAdminsTableProps) {

  useEffect(() => {
    getAllAdminsList();
  }, [getAllAdminsList]);

  return (
    <>
      {adminReducer.loading ?
        <h1>Loading</h1> : adminReducer.error ?
          <h1>Oops, an error has occured</h1> :
          <AllAdminsTableDumb
            adminList={adminReducer.adminsSuccess}
            // deleteSelected={deleteSelected}
          />
      }
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllAdminsTableSmart);
