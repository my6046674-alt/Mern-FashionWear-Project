import { persist } from "zustand/middleware";
import { create } from "zustand";

const useAuthStore = create(
  persist((set) => ({
    user: null,
    isAuthenticated: false,

        loginUser:({user})=>{
            set({
                user,
                isAuthenticated:true,
            });
            localStorage.setItem("authToken", user.token)
        },
        registerUser:({user})=>
            {
            set({
                user,
                isAuthenticated:true,
            });
            localStorage.setItem("authToken", user.token)
        },
            
        logout:()=>
            set({
               user:null,
               isAuthenticated:false,
            })
  

    }),{name:"zustand:auth-storage"}),
)

export default useAuthStore;