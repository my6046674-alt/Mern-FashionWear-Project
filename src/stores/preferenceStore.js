import { persist } from "zustand/middleware";
import { create } from "zustand";

const usePreferenceStore = create(
  persist((set) => ({
     theme:"light",

        toggleTheme:()=>{
            set((state)=>({
                theme:state.theme=="light"?"dark":"light"
            }));
        },
  

    }),{name:"zustand:preference-storage"}),
)

export default usePreferenceStore;