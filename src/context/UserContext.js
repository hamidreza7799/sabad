import React from "react"

const UserContext = React.createContext({
    isAuth: false,
    token: '',
    pk: 0,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: ''
})

export default UserContext