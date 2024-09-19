import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
// import Error from './Pages/Error';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ComplainantDashboard from './Components/Complainant/ComplainantDasboard';
import ComplaintPage from './Components/Complainant/ComplaintPage';
import AddComplaint from './Components/Complainant/AddComplaint';
import Profile from './Components/Complainant/Profile';
import AddStation from './Components/Police/Station';
import AdminDashboard from './Components/Admin/AdminDashboard';
import AddPoliceOfficer from './Components/Police/AddPolice';
import ViewPoliceOfficers from './Components/Police/ViewPolice';
import ViewStations from './Components/Police/ViewStation';
import PoliceDashboard from './Components/Police/PoliceDashboard'
 import AssignPoliceOfficer from './Components/Police/AssignPolice';
// import PoliceProfile from './Components/Police/PoliceProfile';
import PoliceList from './Components/Police/PoliceList';
 import ViewComplaints from './Components/Complainant/ViewComplaint';
import ReportDetails from './Components/Complainant/complainantReport';

import AllReports from './Components/Admin/ViewAllReports';

import PoliceProfile from './Components/Police/PoliceProfile';

import './i18n'; // Import the i18n configuration


function AppRouter() {
  return (
    <Router>
 
      <Routes>
 
        {/* LandingPage */}
        {/* <Route path="*" element={<Error />} /> */}
        <Route path='/' element={<LandingPage />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register/>}/>
    
       
        {/* Admin */}
        <Route path='/adminDashboard' element={<AdminDashboard />} />
        <Route path="/allreport" element={<AllReports />} />

            {/* Complainant */}
            <Route path='/profile/:email' element={<Profile />} />
            <Route path='/complainantDashboard' element={<ComplainantDashboard/>}/>
            <Route path='/complaintPage' element={<ComplaintPage/>}/>
             <Route path='/addComplaint' element={<AddComplaint/>}/>
             <Route path="/assign-police-officer" element={<AssignPoliceOfficer />} />
             <Route path="/viewComplaints" element={<ViewComplaints />} />
             <Route path="/report-details/:complainantId" element={<ReportDetails />} />
             {/* police  */}

             <Route path='/addpolice' element={<AddPoliceOfficer/>}/>
            <Route path='/addstation' element={<AddStation/>}/>
            <Route path="/policeDashboard" element={<PoliceDashboard />} />
            <Route path='/viewpolice' element={<ViewPoliceOfficers/>}/>
            <Route path="/police-officers/:stationId" element={<ViewPoliceOfficers />} />
            <Route path='/viewstation' element={<ViewStations/>}/>
            <Route path="/policeprofile/:userEmail" element={<PoliceProfile />} />

            <Route path="/police/:stationId" element={<PoliceList />} /> {/* New route */}

    
      </Routes>
 
    </Router>
  );
}
 
export default AppRouter;
 
 