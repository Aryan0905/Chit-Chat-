import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";


const useLogin = () => {
   const [loading, setLoading] = useState(false);
   const {setAuthUser} = useAuthContext();

   const login = async(username,password)=>{

    const sucess= handleLoginErrors({username,password});

    if(!sucess) return;

         setLoading(true);
         try {
              const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                     "Content-Type": "application/json",
                },
                body: JSON.stringify({username,password}),
              });
    
              const data = await res.json();
              if(data.error) throw new Error(data.error);
    
              localStorage.setItem("chat-user", JSON.stringify(data));
              setAuthUser(data);

              console.log("i am at useLogin.js");
    
         } catch (error) {
              toast.error(error.message);
         } finally {
              setLoading(false);
         }
   }

    return {login,loading};
} 

export default useLogin;

function handleLoginErrors({username,password}){
    if(  !username || !password){
        toast.error('Please fill in all fields');
        return false;
    }

    return true;
}