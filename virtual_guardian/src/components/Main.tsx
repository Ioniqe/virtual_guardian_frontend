import { Switch, Route, Redirect } from "react-router-dom";
import AdminHomeSmart from "./admin/AdminHomeSmart";
import CaregiverHomeSmart from "./caregiver/CaregiverHomeSmart";
import DoctorHomeSmart from "./doctor/DoctorHomeSmart";
import HomeSmart from "./login/HomeSmart";
import PatientHomeSmart from "./patient/PatientHomeSmart";

function Main() {

  let userType: string = '';

  if (JSON.parse(sessionStorage.getItem('user') as string) !== null)
    userType = JSON.parse(sessionStorage.getItem('user') as string).type;


  return (
    <Switch>
      <Route exact path='/' component={HomeSmart} />
      
      {/* <ProtectedRoute exact path="/admin" />
      <ProtectedRoute exact path="/patient" />
      <ProtectedRoute exact path="/caregiver" />
      <ProtectedRoute exact path="/doctor" /> */}

      {/* <ProtectedRoute2 isAuthenticated={ userType === "admin" } exact path="/admin" component={ AdminHomeSmart }/>
      <ProtectedRoute2 isAuthenticated={ userType === "patient" } exact path="/patient" component={ PatientHomeSmart }/>
      <ProtectedRoute2 isAuthenticated={ userType === "caregiver" } exact path="/caregiver" component={ CaregiverHomeSmart }/>
      <ProtectedRoute2 isAuthenticated={ userType === "doctor" } exact path="/doctor" component={ DoctorHomeSmart }/> */}
    
      {/* <Route exact path='/' render={() =>
        ((userType === '') && <HomeSmart />)} /> */}

      <Route exact path='/admin' render={() =>
        ((userType !== '' && userType === "admin") ? (<AdminHomeSmart />) : (<Redirect to='/' />))} />
      
      <Route exact path='/patient' render={() =>
        ((userType !== '' && userType === "patient") ? (<PatientHomeSmart />) : (<Redirect to='/' />))} />
      
      <Route exact path='/caregiver' render={() =>
        ((userType !== '' && userType === "caregiver") ? (<CaregiverHomeSmart />) : (<Redirect to='/' />))} />
      
      <Route exact path='/doctor' render={() =>
        ((userType !== '' && userType === "doctor") ? (<DoctorHomeSmart />) : (<Redirect to='/' />))} />
      
    </Switch>
  );
}

export default Main;