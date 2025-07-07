import { createContext, useState } from "react";

const isLoggedInContext = createContext({ 
    isLoggedIn: false,
    setIsLoggedIn: () => {}
});//we create the room

function UserLoggedInComponentProvider({children}){ //children is the people that will access the room 
    const [isLoggedIn, setIsLoggedIn] = useState();    //what will be inside the room
   
    return(
        <isLoggedInContext.Provider value={{isLoggedIn, setIsLoggedIn}}> {/*we make the children accessible to all the room*/}
            {children}
        </isLoggedInContext.Provider>
    )
}
export {isLoggedInContext, UserLoggedInComponentProvider};