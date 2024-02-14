import { createContext } from "react";
import useAuth from "../hooks/useAuth";

const Context = createContext()


function UserProvider({children}) {

    const {authenticated, register, logout, userInfo, login } = useAuth() 

    return (
        <Context.Provider value={{authenticated, register, userInfo, logout, login}}>{children}</Context.Provider>
    )
}
export {Context, UserProvider}


