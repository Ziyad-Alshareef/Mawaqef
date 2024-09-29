import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Operator from './pages/Operator'
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminDashboard from "./pages/AdminDashboard"
import Body1 from "./pages/Body1"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="logo">
          <a href="/">
            <img src="./public/logo.png" alt="Mawaqef Logo" className="logo-image" />
          </a>
        </span>
      </div>
      <div className="navbar-right">
        <a href="/Ogranizations">Organizations</a>
        <a href="/login">Sign In</a>
        <a href="/register">Sign Up</a>
      </div>
    </nav>
  )
}

function App() {
  return (
    <BrowserRouter><Navbar />
      <Routes>
      
      <Route path="/" element={<Body1 />} />
        <Route
          path="/operator"
          element={
            <ProtectedRoute>
              <Operator />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />

        <Route path="*" element={<NotFound />}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
