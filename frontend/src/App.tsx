import Login from './pages/Login.tsx'
import Dashboard from './pages/Dashboard.tsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { SupabaseProvider } from './components/SupabaseContext.tsx'
import './App.css'
import React from 'react'
import PrivateRoute from './pages/PrivateRoute.tsx'

function App() {

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", minWidth: "50vw" }}>
      <SupabaseProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/success" element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SupabaseProvider>
    </div>
  )
}

export default App
