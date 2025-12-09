import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSupabase } from "../components/SupabaseContext";

const PrivateRoute = () => {
  const supabase = useSupabase();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null indica que está cargando

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(!!user); 
      }
    };

    checkUser();
  }, [supabase]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
