import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-800">
      <h1 className="text-9xl font-extrabold text-gray-900">404</h1>
      <p className="text-2xl mt-4">Oops! Page not found</p>
      <p className="mt-2 text-gray-500">The page you’re looking for doesn’t exist or has been moved.</p>
      
      <Link
        to="/" 
        className="mt-6 px-6 py-3 rounded-2xl bg-green-600 text-white text-lg font-medium hover:bg-green-700 transition"
      >
        Go Home
      </Link>
    </div>  )
}
