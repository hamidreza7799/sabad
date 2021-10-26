import React from "react"

const UserContext = React.createContext({
    isAuth: false,
    token: '',
    pk: 0,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    setUserInformation: () => {}
})


export const UserContextProvider = UserContext.Provider
export const UserContextConsumer = UserContext.Consumer
export default UserContext