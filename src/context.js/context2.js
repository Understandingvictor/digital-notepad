import { createContext, useState } from "react";

const isLoggedInContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => {}
});

function UserLoggedInComponentProvider({children}){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return(
        <isLoggedInContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {children}
        </isLoggedInContext.Provider>
    )
}
export {isLoggedInContext, UserLoggedInComponentProvider};