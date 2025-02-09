import React, { useContext } from 'react'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import ProfileCard from './pages/Profile';

const App = () => {

  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }

    return children
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' />
        <Route index element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='profile' element={<ProfileCard />} />
        <Route path='*' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;