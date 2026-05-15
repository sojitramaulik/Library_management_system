import { Navigate } from "react-router-dom";

import { useAuth } from "react-oidc-context";

export default function ProtectedRoute({children}: any) {

  const auth = useAuth();

  if (auth.isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!auth.isAuthenticated) {
    auth.signinRedirect();
    return null;
  }

  
  return children;
  
};
