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
import Navbar from "./navbar/Navbar";
import AdminHomeSmart_test from "./users/admin/AdminHomeSmart_test";
import { NavbarUserItems } from "./navbar/MenuItems";


interface Props {
  loginUser: {
    loading: boolean,
    loginSuccessful: User,
    error: string,
  },
  removeUser: () => void,
}

function Main({ loginUser, removeUser }: Props) {

  let userType = loginUser.loginSuccessful.type;

  return (
    <>
      {userType !== '' && <Navbar removeUser={removeUser} links={( NavbarUserItems.find(item => (item.user === userType) )!.items)}/>}
      <Switch>
        <Route exact path='/' component={HomeSmart} />

        <ProtectedRoute exact isAuthenticated={userType === 'admin'} path='/admin' component={AdminHomeSmart} removeUser={removeUser} />
        <ProtectedRoute exact isAuthenticated={userType === 'admin'} path='/admin/test' component={AdminHomeSmart_test} removeUser={removeUser} />

        <ProtectedRoute exact isAuthenticated={userType === 'doctor'} path='/doctor' component={DoctorHomeSmart} removeUser={removeUser} />

        <ProtectedRoute exact isAuthenticated={userType === 'caregiver'} path='/caregiver' component={CaregiverHomeSmart} removeUser={removeUser} />

        <ProtectedRoute exact isAuthenticated={userType === 'patient'} path='/patient' component={PatientHomeSmart} removeUser={removeUser} />

      </Switch>
    </>
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