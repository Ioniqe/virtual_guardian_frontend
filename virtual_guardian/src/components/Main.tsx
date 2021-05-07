import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { removeLoggedUser } from "../actions/LoginAction";
import { User } from "../model/models";
import AdminHomeSmart from "./users/admin/AdminHomeSmart";
import HomeSmart from "./login/HomeSmart";
import ProtectedRoute from "./ProtectedRoute";
import DoctorHomeSmart from "./users/doctor/DoctorHomeSmart";
import CaregiverHomeSmart from "./users/caregiver/CaregiverHomeSmart";
import PatientHomeSmart from "./users/patient/PatientHomeSmart";

interface Props {
  loginUser: {
    loading: boolean,
    loginSuccessful: User,
    error: string
  },
  removeUser: () => void,
}

function Main({ loginUser, removeUser } : Props) {

  return (
    <Switch>
      <Route exact path='/' component={HomeSmart} />

      <ProtectedRoute isAuthenticated={loginUser.loginSuccessful.type === 'admin'} path='/admin' component={AdminHomeSmart} removeUser={removeUser}>
        <AdminHomeSmart />
      </ProtectedRoute>

      <ProtectedRoute isAuthenticated={loginUser.loginSuccessful.type === 'doctor'} path='/doctor' component={ DoctorHomeSmart } removeUser={ removeUser }>
        <DoctorHomeSmart />
      </ProtectedRoute>

      <ProtectedRoute isAuthenticated={loginUser.loginSuccessful.type === 'caregiver'} path='/caregiver' component={ CaregiverHomeSmart } removeUser={ removeUser }>
        <CaregiverHomeSmart />
      </ProtectedRoute>

      <ProtectedRoute isAuthenticated={loginUser.loginSuccessful.type === 'patient'} path='/patient' component={ PatientHomeSmart } removeUser={ removeUser }>
        <PatientHomeSmart />
      </ProtectedRoute>
    </Switch>
  );
}

const mapStateToProps = (state: any) => {
  return {
    loginUser: state.login
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    removeUser: () => dispatch(removeLoggedUser()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);