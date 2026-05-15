import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

export default function ProtectedRoute({ children }: any) {
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      auth.signinRedirect();
    }
  }, [auth.isLoading, auth.isAuthenticated]);

  if (auth.isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!auth.isAuthenticated) {
    return null;
  }

  return children;
}
