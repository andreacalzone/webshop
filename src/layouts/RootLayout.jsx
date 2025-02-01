import React from 'react'
import { Outlet } from "react-router"
import Navbar from '../components/Navbar'
import Providers from '../components/Providers'

const RootLayout = () => {
  return (
    <Providers>
      <div 
        className="min-h-screen text-blue-800 bg-linear-to-r from-cyan-500 to-blue-500">
        <Navbar />
        <div className="container m-auto px-2">
          <Outlet />
        </div>
      </div>
    </Providers>
  )
}

export default RootLayout
