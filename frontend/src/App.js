import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/users/login-component';
import Signup from './components/users/signup-component';
import ListEmployees from './components/employees/list-employees-component';
import AddEmployee from './components/employees/add-employee-component';
import ViewEmployee from './components/employees/view-employee-component';
import UpdateEmployee from './components/employees/update-employee-component';
import { CFG_FRONTEND } from './config';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path={CFG_FRONTEND.login} element={<Login/>} />
        <Route path={CFG_FRONTEND.signup} element={<Signup/>} />
        <Route path={CFG_FRONTEND.getEmployees} element={<ListEmployees/>} />
        <Route path={CFG_FRONTEND.addEmployee} element={<AddEmployee/>} />
        <Route path={CFG_FRONTEND.getEmployee + '/:id'} element={<ViewEmployee/>} />
        <Route path={CFG_FRONTEND.updateEmployee + '/:id'} element={<UpdateEmployee/>} />
      </Routes>
    </Router>
  );
}

export default App;


/*
Add, View, Update, Delete Employee:

Add Employee: You can create a form similar to the login/signup forms to add new employees, handling input and making POST requests to the API.
View Employee: You can display employee details in a modal or a separate page when clicking "View".
Update Employee: Similar to adding, but with pre-filled data and a PUT request to update the employee details.
Delete Employee: Add a delete button to each row in the table with a DELETE request when clicked.
Session Management:

The session is managed by storing the token in localStorage and checking its presence for authenticated routes.
Logout Functionality: Add a logout button in the EmployeeList component, which clears the session (localStorage.clear()), and redirects to the login screen.

Styling:

Use Material-UI components for clean UI design, or Bootstrap for a quicker layout. You can customize components as necessary for a professional look.

*/