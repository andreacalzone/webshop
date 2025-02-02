import React from 'react'
import { Outlet } from "react-router"
import Navbar from '../components/Navbar'
import Providers from '../components/Providers'

const RootLayout = () => {
  return (
    <Providers>
      <div 
        className="min-h-screen text-blue-800 bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
        <Navbar />
        <div className="container m-auto px-2">
          <Outlet />
        </div>
      </div>
    </Providers>
  )
}

export default RootLayout
