import React from 'react'
import { useSession } from 'next-auth/react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { data: session } = useSession();
    
  return session ? <Navigate to="/"/> : <div>{children}</div>
}

export default ProtectedRoute