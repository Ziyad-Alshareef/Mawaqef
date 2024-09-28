import './App.css'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Body1 from './Body1.jsx'
import AdminNavbar from './AdminNavbar.jsx'


function Admin() {
    return (
        <div>
            <AdminNavbar />
            <h1 className='Admin-Dashboard'>Admin Dashboard</h1>
        </div>
    )
}

export default Admin;