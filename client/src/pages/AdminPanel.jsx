import React from 'react'
import { useState } from 'react'
import '../App.css'
import Header from '../components/admin/Header'
import Sidebar from '../components/admin/Sidebar'
import Home from '../components/admin/Home'


function AdminPanel() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <div className='grid-container'>
    <Header OpenSidebar={OpenSidebar}/>
    <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <Home />
  </div>
)
 
}

export default AdminPanel