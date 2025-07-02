import { createContext, useState } from "react";

const usersNameContext = createContext({
    usersName: '',
    setUsersName: () => {}
}); //we create the room

function UsersNameContextProvider({children}){ //children is the people that will access the room 
    const [usersName, setUsersName] = useState(''); //what will be inside the room

    return(
        <usersNameContext.Provider value={{usersName, setUsersName}}> 
            {children}
        </usersNameContext.Provider>
    )
}
export {usersNameContext, UsersNameContextProvider} ;