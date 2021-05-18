import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { removeLoggedUser } from "../actions/LoginAction";
import { User } from "../model/models";
import AdminHomeSmart from "./users/admin/AdminHomeSmart";
import HomeSmart from "./login/HomeSmart";
import ProtectedRoute from "./ProtectedRoute";
import DoctorHomeSmart from "./users/doctor/DoctorHomeSmart";
import CaregiverHomeSmart from "./users/caregiver/CaregiverHomeSmart";
import Navbar from "./navbar/Navbar";
import { NavbarUserItems } from "./navbar/MenuItems";
import AllAdminsTableSmart from "./users/admin/AllAdminsTablePage/AllAdminsTableSmart";
import PatientHomeSmart from "./users/patient/home/PatientHomeSmart";
import PatientTestForDiseaseSmart from "./users/patient/testForDiseasePage/PatientTestForDiseaseSmart";
import PatientsPageSmart from "./users/doctor/patientsPage/PatientsPageSmart";
import CaregiversPageSmart from "./users/doctor/caregiversPage/CaregiversPageSmart";
import ExperimentsSmart from "./users/admin/experimentsPage/ExperimentsSmart";


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
      {userType !== '' && <Navbar removeUser={removeUser} userItems={( NavbarUserItems.find(item => (item.user === userType))!)}/>}
      <Switch>
        <Route exact path='/' component={HomeSmart} />

        <ProtectedRoute exact isAuthenticated={userType === 'admin'} path='/admin' component={AdminHomeSmart} removeUser={removeUser} />
        <ProtectedRoute exact isAuthenticated={userType === 'admin'} path='/admin/list' component={AllAdminsTableSmart} removeUser={removeUser} />
        <ProtectedRoute exact isAuthenticated={userType === 'admin'} path='/admin/experiments' component={ExperimentsSmart} removeUser={removeUser} />
        
        <ProtectedRoute exact isAuthenticated={userType === 'doctor'} path='/doctor' component={DoctorHomeSmart} removeUser={removeUser} />
        <ProtectedRoute exact isAuthenticated={userType === 'doctor'} path='/doctor/patient/list'  component={() => <PatientsPageSmart loggedUser={ loginUser.loginSuccessful }/>} removeUser={removeUser} />
        <ProtectedRoute exact isAuthenticated={userType === 'doctor'} path='/doctor/caregiver/list'  component={() => <CaregiversPageSmart loggedUser={ loginUser.loginSuccessful }/>} removeUser={removeUser} />

        <ProtectedRoute exact isAuthenticated={userType === 'caregiver'} path='/caregiver' component={CaregiverHomeSmart} removeUser={removeUser} />

        <ProtectedRoute exact isAuthenticated={userType === 'patient'} path='/patient' component={() => <PatientHomeSmart loggedUser={ loginUser.loginSuccessful }/>} removeUser={removeUser} />
        <ProtectedRoute exact isAuthenticated={userType === 'patient'} path='/patient/test' component={() => <PatientTestForDiseaseSmart loggedUser={ loginUser.loginSuccessful }/>} removeUser={removeUser} />

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