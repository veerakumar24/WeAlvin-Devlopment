import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';

import Menu from './components/nav/Menu';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register'; 
import Dashboard from './pages/User/Dashboard';
import PrivateRoute from './components/nav/routes/PrivateRoute';
import CreateEmploye from './pages/User/CreateEmploye';
import UpdateEmployee from './pages/User/UpdateEmployee';
import EmployeeList from './pages/User/EmployeeList';
import SearchPage from './pages/SearchPage';

const PageNotFound = () => {
  return <React.Fragment>404 | Page Not Found</React.Fragment>;
};

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
        </Route>
        <Route path="/create-employee" element={<CreateEmploye />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="employee-list/update/:id" element={<UpdateEmployee />} />
        <Route path="*" element={<PageNotFound />} replace />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

