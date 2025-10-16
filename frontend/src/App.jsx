import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Terms from './pages/Terms'
import Pricelist from './pages/Pricelist'

const PrivateRoute = ({ element }) => {
  const accessToken = localStorage.getItem('accessToken')

  // If no token, redirect to login
  if (!accessToken) {
    return <Navigate to="/" replace />
  }

  return element
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/terms" element={<Terms />} />
        <Route
          path="/pricelist"
          element={<PrivateRoute element={<Pricelist />} />}
        />
      </Routes>
    </BrowserRouter>
  )
}
