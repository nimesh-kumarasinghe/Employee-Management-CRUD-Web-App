import logo from './logo.svg';
import './App.css';
import AddEmployee from './components/addEmployee';
import AddDepartment from './components/addDepartment';
import ViewEmployee from './components/viewEmployee';
import ViewDepartment from './components/viewDepartment';
import ModifyEmployee from './components/modifyEmployee';
import ModifyDepartment from './components/modifyDepartment';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sideBar';


function App() {
  return (
    <Router>
            <Sidebar/>
      <Routes>
        <Route path="/add-employee"  element={<AddEmployee/>}/>
        <Route path="/view-employee"  element={<ViewEmployee/>}/>
        <Route path="/modify-employee"  element={<ModifyEmployee/>}/>
        <Route path="/add-department"  element={<AddDepartment/>}/>
        <Route path="/view-department"  element={<ViewDepartment/>}/>
        <Route path="/modify-department"  element={<ModifyDepartment/>}/>
      </Routes>
    </Router>
  );
}

export default App;
