import React from "react"

const UserContext = React.createContext({
    isAuth: false,
    token: '',
    username: '',
    email: '',
    password: ''
})

export default UserContext