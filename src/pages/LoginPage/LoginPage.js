import React from "react"

import axios from "../../axios"
import UserContext from "../../context/UserContext"
import AppContext, { AppContextConsumer, AppContextProvider } from "../../context/AppContext"
import './LoginPage.css'
import SigninForm from "../../components/From/SigninForm/SigninForm"
import CircleImage from "../../components/CircleImage/CircleImage"
import Wrapper from "../../hoc/Wrapper";


class LoginPage extends React.Component {

    static contextType = AppContext

    constructor(props) {
        super(props)
        this.state = {
            login: false,
            isAuth: false,
            token: '',
            pk: 0,
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: ''
        };
    }

    render() {
        return (
            <UserContext.Provider value={{
                isAuth: this.state.isAuth,
                token: this.state.token,
                pk: this.state.pk,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }}
            >
                <Wrapper>
                    <div className="login">
                        <div className={`sidebar-container  ${this.state.login ? 'sidebar-container--left' : 'sidebar-container--right'}`}></div>
                        <div className={`login__welcome-back ${this.state.login ? 'login__welcome-back--active' : 'login__welcome-back--inactive'}`}>
                        </div>
                        <div className={`login__hello-container ${!this.state.login ? 'login__hello-container--active' : 'login__hello-container--inactive'}`}>
                        </div>


                        <div className={`login__create-container ${this.state.login ? 'login__create-container--active' : 'login__create-container--inactive'}`}>
                            <CircleImage></CircleImage>
                            <SigninForm signinHandler={this.signinHandler} changeSideBarHandler={this.changeSideBarHandler}></SigninForm>
                        </div>
                        <div className={`login__login-container ${!this.state.login ? 'login__login-container--active' : 'login__login-container--inactive'}`}>
                            <CircleImage></CircleImage>
                            <SigninForm signinHandler={this.signinHandler} changeSideBarHandler={this.changeSideBarHandler}></SigninForm>
                        </div>
                    </div>
                </Wrapper>
            </UserContext.Provider>

        );
    }

    changeSideBarHandler = () => {
        this.setState({
            ...this.state,
            login: this.state.login
        })
    }

    signinHandler = (form_variables) => {
        this.context.openLoadingHandler()
        const payload = {
            "username": form_variables.email_username,
            "password": form_variables.password
        }
        axios.post("/api/auth/login/", payload).then((response) => {
            this.setState({
                ...this.state,
                isAuth: true,
                token: response.data.token,
                pk: response.data.user.pk,
                firstName: response.data.user.first_name,
                lastName: response.data.user.last_name,
                username: response.data.user.username,
                email: response.data.user.email,
                password: response.data.user.password

            })
            window.location.href = "/Dashboard";
        }).catch((error) => {
            this.context.openMessageDialogHandler({
                messageType: "error",
                messageText: ''
            })
            console.log(error.response?.data)
        }).finally(() => {
            this.context.closeLoadingHandler()
        })
    }
}

export default LoginPage