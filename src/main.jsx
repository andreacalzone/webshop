import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import RootLayout from './layouts/RootLayout'
import HomePage from './pages/HomePage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import CheckoutPage from './pages/CheckoutPage'
import ContactPage from './pages/ContactPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import MinSida from './components/MinSida'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "products/:productId",
        element: <ProductDetailsPage />
      },
      {
        path: "checkout",
        element: <CheckoutPage />
      },
      {
      path: "contact",
      element: <ContactPage />
      },
      {
      path: "register",
      element: <RegisterPage />
      },
      {
      path: "login",
      element: <LoginPage />
      },
      {
      path: "min-sida",
      element: <MinSida />
      }
  
  ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)