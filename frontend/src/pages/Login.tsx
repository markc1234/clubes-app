import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSupabase } from "../components/SupabaseContext";

const Login = () => {
  const navigate = useNavigate();
  const supabase = useSupabase();


  useEffect(() => {
    const { data: {subscription} } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN") {
        console.log("Usuario autenticado:", session?.user);
  
        const { data: userInfo, error } = await supabase
          .from("usuario")
          .select("*")
          .eq("id", session?.user?.id)
          .single();
  
        if (!error) {
          localStorage.setItem("user_info", JSON.stringify(userInfo));
          navigate("/success");
        } else {
          const { error } = await supabase.auth.signOut();
          console.error("Error al obtener información del usuario:", error);
        }
      }
    });
  
    return () => {
      subscription?.unsubscribe();
    };
  }, [supabase, navigate]);
  

  return (
    <>
      <Auth
        supabaseClient={supabase}
        theme="dark"
        providers={["google"]}
        appearance={{ theme: ThemeSupa, style:{container: {width: "20vw"} } }}
      />
    </>
  );
};

export default Login;
